const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCategoryCollectionId: String(
    import.meta.env.VITE_APPWRITE_CATEGORY_COLLECTION_ID
  ),
  appwriteExpenseCollectionId: String(
    import.meta.env.VITE_APPWRITE_EXPENSE_COLLECTION_ID
  ),
};

export default config;
