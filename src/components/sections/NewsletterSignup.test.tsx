import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterSignup from "@/components/sections/NewsletterSignup";

describe("NewsletterSignup", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects an invalid email and does not submit", async () => {
    const user = userEvent.setup();
    render(<NewsletterSignup />);

    await user.type(screen.getByPlaceholderText(/you@example.com/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits a valid email, posts to FormSubmit, and shows the subscribed state", async () => {
    const user = userEvent.setup();
    render(<NewsletterSignup />);

    await user.type(screen.getByPlaceholderText(/you@example.com/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://formsubmit.co/ajax/"),
      expect.objectContaining({ method: "POST" })
    );
    const [, options] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const sentBody = JSON.parse(options.body as string);
    expect(sentBody).toMatchObject({ email: "jane@example.com" });
  });

  it("shows an error message instead of a fake subscribed state when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const user = userEvent.setup();
    render(<NewsletterSignup />);

    await user.type(screen.getByPlaceholderText(/you@example.com/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
    expect(screen.queryByText(/you're subscribed/i)).not.toBeInTheDocument();
  });
});
