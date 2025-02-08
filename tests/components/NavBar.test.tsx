import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import Navbar from "../../src/Navbar/Navbar";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../src/Auth/AuthContext.tsx";

const mockLogout = vi.fn();

vi.mock("../../src/Auth/AuthContext.tsx", async () => {
    const actual = await vi.importActual<typeof import("../../src/Auth/AuthContext.tsx")>(
        "../../src/Auth/AuthContext.tsx"
    );

    return {
        ...actual,
        useAuth: vi.fn(() => ({
            user: { name: "John Doe", role: "User" },
            isAuthenticated: true,
            logout: mockLogout,
        })),
    };
});

vi.mock("react-router-dom", async () => {
    const originalModule = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
    return {
        ...originalModule,
        useNavigate: vi.fn(),
    };
});

describe("Navbar Component", () => {
    let mockNavigate: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockNavigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it("renders all navigation items", () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </AuthProvider>
        );

        const navItems = [
            "Home",
            "Vendors",
            "Certifications",
            "Components",
            "Counties",
            "Contracts",
            "Expenses",
            "Inventory Units",
            "Dispositions",
            "Storage Locations",
            "Audits",
            "Logout",
        ];

        navItems.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it("navigates to the correct route when items are clicked", async () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </AuthProvider>
        );

        const user = userEvent.setup();

        await user.click(screen.getByText("Home"));
        expect(mockNavigate).toHaveBeenCalledWith("/");

        await user.click(screen.getByText("Vendors"));
        expect(mockNavigate).toHaveBeenCalledWith("/vendors");

        await user.click(screen.getByText("Certifications"));
        expect(mockNavigate).toHaveBeenCalledWith("/certifications");
    });

    it("calls logout function when Logout is clicked", async () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </AuthProvider>
        );

        const user = userEvent.setup();

        screen.debug();

        const logoutButton = screen.getByRole("button", { name: /logout/i });

        expect(logoutButton).toBeInTheDocument();

        await user.click(logoutButton);

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
