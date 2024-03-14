import conf from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // TO REGISTER USER
  async createAccount({ name, email, password }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (user) {
        console.log('ACCOUNT (USER) CREATED');
        return this.login({ email, password });
      } else {
        console.log('ACCOUNT (USER) NOT CREATED');
        return user;
      }
    } catch (error) {
      throw console.log('ERROR ON CREATING ACCOUNT (USER)', error);
    }
  }

  // TO LOGIN USER
  async loginAccount({ email, password }) {
    try {
      return this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw console.log('ERROR ON LOGIN ACCOUNT (USER)', error);
    }
  }

  // GET CURRENT USER
  async getCurrentAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      throw console.log('ERROR ON FETCHING CURRENT ACCOUNT (USER)', error);
    }
  }

  // TO LOGOUT USER
  async logoutAccount() {
    try {
      return this.account.deleteSessions();
    } catch (error) {
      throw console.log('ERROR ON DELETING ACCOUNT (USER)', error);
    }
  }
}

const authservice = new Authservice();
export default authservice;
