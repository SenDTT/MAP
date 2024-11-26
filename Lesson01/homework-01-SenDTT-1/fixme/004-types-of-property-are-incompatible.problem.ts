const routingConfig = {
  routes: [
    {
      path: "home",
      component: "HomeComponent",
    },
    {
      path: "about",
      component: "AboutComponent",
    },
    {
      path: "contact",
      component: "ContactComponent",
    },
  ],
};

const createRoutes = (config: {
  routes: {
    path: string;
    component: string;
  }[];
}) => {};

createRoutes(routingConfig);
