import { CourseCategory, getCategories } from './courseData';

export interface MenuItem {
  title: string;
  url: string;
  submenu?: MenuItem[];
}

const courseCategoriesToMenuItems = (
  categories: CourseCategory[]
): MenuItem[] => {
  const menuItems: MenuItem[] = [];

  for (const category of categories) {
    const categoryMenu: MenuItem = {
      title: category.name,
      url: category.url,
    };

    if (category.subcategories.length > 0) {
      categoryMenu.submenu = [];

      for (const subcategory of category.subcategories) {
        const subcategoryMenu: MenuItem = {
          title: subcategory.name,
          url: subcategory.url,
        };

        if (subcategory.topics.length > 0) {
          subcategoryMenu.submenu = [];

          for (const topic of subcategory.topics) {
            const topicMenu: MenuItem = {
              title: topic.name,
              url: topic.url,
            };

            subcategoryMenu.submenu.push(topicMenu);
          }

          categoryMenu.submenu.push(subcategoryMenu);
        }
      }
    }

    menuItems.push(categoryMenu);
  }

  return menuItems;
};

export const getCourseCategoriesAsMenuItems = () => {
  const categories = getCategories();
  return courseCategoriesToMenuItems(categories);
};
