"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dashboardRef = useRef(null);
  const userMenuRef = useRef(null);

  const dashboardItems = [
    { label: "Add Service", href: "/add-service" },
    { label: "Manage Service", href: "/managed-services" },
    { label: "Booked-Services", href: "/booked-services" },
    { label: "Service to-do", href: "/todo-services" },
  ];

  const userMenuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Logout", href: "/logout" },
  ];

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase logout
      localStorage.removeItem("authToken"); // Remove the auth token from local storage
      toast.success("Logout successful!");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      toast.error("Failed to log out: " + error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dashboardRef?.current &&
        !dashboardRef?.current.contains(event.target)
      ) {
        setIsDashboardOpen(false);
      }
      if (userMenuRef?.current && !userMenuRef?.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (setIsOpen, isOpen) => {
    setIsOpen(!isOpen);
  };

  return (
    
    <nav className="w-full bg-background p-4">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 border border-gray-200 bg-navBg rounded-2xl">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            logo
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex ">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/all-services"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Services
          </Link>

          {user && (
            <div
              ref={dashboardRef}
              onMouseEnter={() => setIsDashboardOpen(true)}
              onMouseLeave={() => setIsDashboardOpen(false)}
            >
              <DropdownMenu
                open={isDashboardOpen}
                onOpenChange={setIsDashboardOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1"
                    onClick={() =>
                      handleDropdownToggle(setIsDashboardOpen, isDashboardOpen)
                    }
                  >
                    Dashboard
                    {isDashboardOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-navBg">
                  {dashboardItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                      <Link to={item.href} >{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {user ? (
            <div
              ref={userMenuRef}
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <DropdownMenu
                open={isUserMenuOpen}
                onOpenChange={setIsUserMenuOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                    onClick={() =>
                      handleDropdownToggle(setIsUserMenuOpen, isUserMenuOpen)
                    }
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.photoURL}
                        alt={user?.displayName}
                      />
                      <AvatarFallback> {user?.displayName ? user.displayName[0] : "A"}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {user?.displayName}
                    </span>
                    {isUserMenuOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-navBg">
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <div className="flex flex-col items-start gap-2">
                       { item.label === 'Logout' ? (<Button className="w-full" onClick={handleLogout}>Logout</Button>) : (<Link to={item.href}>{item.label}</Link>)}
                      </div>
                      
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
             { loading ? (
              <p className="text-violet-700 text-xs">user&apos;s info....</p>
             ) : ( <Button asChild>
              <Link to="/login">Login</Link>
            </Button>)}
            </>
           
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[280px] bg-navBg"
            aria-label="Navigation menu"
            aria-description="Mobile navigation menu containing links to different sections of the website"
          >
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-sm font-medium">
                Home
              </Link>
              <Link to="/all-services" className="text-sm font-medium">
                Services
              </Link>
              {user && (
                <>
                  {dashboardItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {userMenuItems.map((item) => (
                  
                      <div key={item.label} className="flex flex-col items-start gap-2">
                      { item.label === 'Logout' ? (<Button className="w-full" onClick={handleLogout}>Logout</Button>) : (<Link to={item.href}>{item.label}</Link>)}
                     </div>
                  ))}
                </>
              )}
              {!user && (
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
    
    
  );
}
