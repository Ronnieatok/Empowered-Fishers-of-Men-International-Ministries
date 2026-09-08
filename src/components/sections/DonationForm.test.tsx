import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DonationForm from "@/components/sections/DonationForm";

describe("DonationForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("blocks submission and shows errors when fields are empty", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);

    await user.click(screen.getByRole("button", { name: /give now/i }));

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/enter an amount greater than 0/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid card number/i)).toBeInTheDocument();

    // Should NOT have attempted a network call, and NOT show the thank-you state
    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });

  it("rejects an invalid email and invalid Kenyan phone format", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Wanjiru");
    await user.type(screen.getByLabelText(/^email$/i), "not-an-email");
    await user.type(screen.getByLabelText(/^phone$/i), "12345");
    await user.click(screen.getByRole("button", { name: /give now/i }));

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid phone number/i)).toBeInTheDocument();
  });

  it("clears a field's error as soon as the user corrects it", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);

    await user.click(screen.getByRole("button", { name: /give now/i }));
    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/full name/i), "Jane Wanjiru");
    expect(screen.queryByText(/full name is required/i)).not.toBeInTheDocument();
  });

  it("submits successfully with valid data, posts to FormSubmit, and shows the thank-you state", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Wanjiru");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^phone$/i), "0712345678");

    // Use a preset amount button instead of typing into the number input
    await user.click(screen.getByRole("button", { name: "1,000" }));

    await user.type(screen.getByPlaceholderText(/card number/i), "4242424242424242");
    await user.type(screen.getByPlaceholderText(/mm\/yy/i), "12/28");
    await user.type(screen.getByPlaceholderText(/^cvc$/i), "123");

    await user.click(screen.getByRole("button", { name: /give now/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });

    // Confirm we actually posted somewhere real, with the right data —
    // not just that a success screen appeared.
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://formsubmit.co/ajax/"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
      })
    );
    const [, options] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const sentBody = JSON.parse(options.body as string);
    expect(sentBody).toMatchObject({
      name: "Jane Wanjiru",
      email: "jane@example.com",
      phone: "0712345678",
      amount: "1000",
      paymentMethod: "card",
    });

    // The success copy must NOT claim payment was actually processed —
    // this integration only emails the donor's intent, it doesn't charge
    // a card. See the honesty note in DonationForm.tsx's handleSubmit.
    expect(
      screen.getByText(/we've received your gift request/i)
    ).toBeInTheDocument();
  });

  it("switches to M-Pesa, skips card validation, and shows honest follow-up copy (not a fake STK push claim)", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Wanjiru");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^phone$/i), "0712345678");
    await user.click(screen.getByRole("button", { name: "500" }));

    // Switch to M-Pesa — card fields should no longer be required or rendered
    await user.click(screen.getByLabelText(/^m-pesa$/i));
    expect(screen.queryByPlaceholderText(/card number/i)).not.toBeInTheDocument();
    expect(screen.getByText(/0712345678/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /give now/i }));

    await waitFor(() => {
      expect(screen.getByText(/complete the m-pesa payment/i)).toBeInTheDocument();
    });

    const [, options] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const sentBody = JSON.parse(options.body as string);
    expect(sentBody).toMatchObject({ paymentMethod: "mpesa" });
  });

  it("shows an error banner instead of a fake success screen when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const user = userEvent.setup();
    render(<DonationForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jane Wanjiru");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^phone$/i), "0712345678");
    await user.click(screen.getByRole("button", { name: "500" }));
    await user.click(screen.getByLabelText(/^m-pesa$/i));

    await user.click(screen.getByRole("button", { name: /give now/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
  });
});
