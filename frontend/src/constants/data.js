
  
  export const topMenu = [
    {
      isHeadr: true,
      title: "menu",
    },
  
    {
      title: "Dashboard",
      icon: "heroicons-outline:home",
      isOpen: true,
      isHide: true,
      link:"dashboard"
    },
    {
      title: "Admin",
      isHide: true,
      icon: "heroicons-outline:user-plus",
      link: "users",
    },
    {
      title: "Configurations",
      isHide: true,
      icon: "heroicons-outline:user-plus",
      link: "/app/home",
      child: [
        {
          childtitle: "SMTP",
          childlink: "dashboard",
          childicon: "heroicons:presentation-chart-line",
        }
      ]
    },
  ];
  