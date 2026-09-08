import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MembershipRegistrationForm from "@/components/sections/MembershipRegistrationForm";

describe("MembershipRegistrationForm", () => {
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
    render(<MembershipRegistrationForm />);

    await user.click(screen.getByRole("button", { name: /^register$/i }));

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByText(/welcome to efmi/i)).not.toBeInTheDocument();
  });

  it("accepts a valid submission, posts to FormSubmit, and shows the welcome state", async () => {
    const user = userEvent.setup();
    render(<MembershipRegistrationForm />);

    await user.type(screen.getByLabelText(/full name/i), "Samwel Kaaleng");
    await user.type(screen.getByLabelText(/address/i), "P.O. Box 123, Lodwar, Turkana");
    await user.type(screen.getByLabelText(/phone no\./i), "0798765432");
    await user.type(screen.getByLabelText(/^email$/i), "samwel@example.com");

    await user.click(screen.getByRole("button", { name: /^register$/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome to efmi/i)).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://formsubmit.co/ajax/"),
      expect.objectContaining({ method: "POST" })
    );
    const [, options] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const sentBody = JSON.parse(options.body as string);
    expect(sentBody).toMatchObject({
      fullName: "Samwel Kaaleng",
      phone: "0798765432",
      email: "samwel@example.com",
      billingCycle: "annual",
    });
  });

  it("switches billing cycle when the monthly option is selected", async () => {
    const user = userEvent.setup();
    render(<MembershipRegistrationForm />);

    const monthlyOption = screen.getByLabelText(/monthly — ksh 100/i);
    await user.click(monthlyOption);
    expect(monthlyOption).toBeChecked();
  });

  it("shows an error banner instead of a fake success screen when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const user = userEvent.setup();
    render(<MembershipRegistrationForm />);

    await user.type(screen.getByLabelText(/full name/i), "Samwel Kaaleng");
    await user.type(screen.getByLabelText(/address/i), "P.O. Box 123, Lodwar, Turkana");
    await user.type(screen.getByLabelText(/phone no\./i), "0798765432");
    await user.type(screen.getByLabelText(/^email$/i), "samwel@example.com");
    await user.click(screen.getByRole("button", { name: /^register$/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
    expect(screen.queryByText(/welcome to efmi/i)).not.toBeInTheDocument();
  });
});
