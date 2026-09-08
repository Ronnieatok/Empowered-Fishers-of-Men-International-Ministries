import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PartnerWithUs from "@/components/sections/PartnerWithUs";

describe("PartnerWithUs", () => {
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
    render(<PartnerWithUs />);

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByText(/organization name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/contact person is required/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/tell us a bit about the partnership/i)).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.queryByText(/we've received your partnership inquiry/i)).not.toBeInTheDocument();
  });

  it("submits successfully with valid data, posts to FormSubmit, and shows the thank-you state", async () => {
    const user = userEvent.setup();
    render(<PartnerWithUs />);

    await user.type(screen.getByLabelText(/organization name/i), "Grace Community Church");
    await user.type(screen.getByLabelText(/contact person/i), "John Doe");
    await user.type(screen.getByLabelText(/^email$/i), "john@gracechurch.org");
    await user.type(
      screen.getByLabelText(/tell us about the partnership/i),
      "We'd like to co-fund a borehole project."
    );

    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/we've received your partnership inquiry/i)).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://formsubmit.co/ajax/"),
      expect.objectContaining({ method: "POST" })
    );
    const [, options] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const sentBody = JSON.parse(options.body as string);
    expect(sentBody).toMatchObject({
      organization: "Grace Community Church",
      contactName: "John Doe",
      email: "john@gracechurch.org",
    });
  });

  it("shows an error banner instead of a fake success screen when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const user = userEvent.setup();
    render(<PartnerWithUs />);

    await user.type(screen.getByLabelText(/organization name/i), "Grace Community Church");
    await user.type(screen.getByLabelText(/contact person/i), "John Doe");
    await user.type(screen.getByLabelText(/^email$/i), "john@gracechurch.org");
    await user.type(
      screen.getByLabelText(/tell us about the partnership/i),
      "We'd like to co-fund a borehole project."
    );
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
    expect(screen.queryByText(/we've received your partnership inquiry/i)).not.toBeInTheDocument();
  });
});
