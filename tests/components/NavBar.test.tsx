import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest"
import Navbar from "../../src/Navbar/Navbar";
import {BrowserRouter, useNavigate} from "react-router-dom";

// Partial mock for react-router-dom
vi.mock("react-router-dom", async () => {
    const originalModule = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );
    return {
        ...originalModule,
        useNavigate: vi.fn(),
    };
});

describe("Navbar Component", () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        // Mock useNavigate behavior before each test
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        vi.clearAllMocks();
    });

    it("renders all navigation items", () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
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
        ];

        navItems.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it("navigates to the correct route when items are clicked", async () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const user = userEvent.setup();

        // Test navigation by clicking on items
        await user.click(screen.getByText("Home"));
        expect(mockNavigate).toHaveBeenCalledWith("/");

        await user.click(screen.getByText("Vendors"));
        expect(mockNavigate).toHaveBeenCalledWith("/vendors");

        await user.click(screen.getByText("Certifications"));
        expect(mockNavigate).toHaveBeenCalledWith("/certifications");
    });
});