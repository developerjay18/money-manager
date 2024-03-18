import conf from '../conf/conf';
import { Client, Databases, ID } from 'appwrite';

export class CategoryService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // TO ADD CATEGORY
  async addCategory(name) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        ID.unique(),
        { name }
      );
    } catch (error) {
      throw console.log('ERROR ON ADDING CATEGORY', error);
    }
  }

  // TO DELETE CATEGORY
  async deleteCategory(id) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        id
      );

      // return true;
    } catch (error) {
      throw console.log('ERROR ON DELETING CATEGORY', error);
    }
  }

  // TO GET CATEGORY
  async getCategory(id) {
    try {
      return this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId,
        id
      );
    } catch (error) {
      throw console.log('ERROR ON FETCHING SINGLE CATEGORY', error);
    }
  }

  // TO GET ALL CATEGORY
  async getAllCategory() {
    try {
      return this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCategoryCollectionId
      );
    } catch (error) {
      throw console.log('ERROR ON FETCHING ALL CATEGORY', error);
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
