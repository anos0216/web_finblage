import { MenuItem, SubMenuItem } from '../types/menu';

// The menus array is now strongly typed
export const groupedMenus: MenuItem[] = [
    {
        name: "News",
        path: '/news',
    },
    {
        name: "Insights",
        subMenus: [
            { name: "Market Insights", path: '/market-insights' },
            { name: "Market Outlook", path: '/market-outlook' },
            { name: "Merger & Acquisition", path: '/merger-acquisition' },
            { name: "Spotlight", path: '/spotlight' },
            { name: "Weekly Articles", path: '/weekly-article' },
        ],
    },
    {
        name: "Services",
        path: '/services',
    },
    {
        name: "Blogs",
        path: '/blogs',
    },
    {
        name: "Company",
        subMenus: [
            { name: "About Us", path: '/about' },
            { name: "Career", path: '/career' },
        ],
    },
];

// The account menu is typed as a single link item
export const accountMenu: SubMenuItem = {
    name: "Account",
    path: "/account",
};