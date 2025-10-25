// Defines a single link item, like "About Us" or "Market Insights"
export interface SubMenuItem {
    name: string;
    path: string;
}

// Defines a top-level menu item. It can be a direct link OR a dropdown container.
export type MenuItem = {
    name: string;
} & (
    // A simple link has a path but no submenus
    {
        path: string;
        subMenus?: never; // Ensures subMenus cannot exist if path exists
    } |
    // A dropdown has submenus but no direct path
    {
        path?: never; // Ensures path cannot exist if subMenus exist
        subMenus: SubMenuItem[];
    }
);