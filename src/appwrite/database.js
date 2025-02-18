import config from '../conf/config';
import { Client, Databases, ID, Query } from "appwrite";

export class databaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
    }

    async createChat(userID, messages = []) {
        try {
            const docID = ID.unique(); 
            const created_at = Date.now();
            let created_at_string = JSON.stringify(created_at);
            let messagesString=[];
            messages.forEach(element => {
                let curr=JSON.stringify(element);
                messagesString.push(curr);
            });

            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                docID,
                { user_id: userID, messages: messagesString,created_at:created_at_string }
            );
        } catch (error) {
            console.error("Appwrite Service :: createChat() :: ", error);
            return false;   
        }
    }

    async updateChat(chatID, userID, messages) {
        try {
            let messagesString=[];
            messages.forEach(element => {
                let curr=JSON.stringify(element);
                messagesString.push(curr);
            });

            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                chatID,
                { messages: messagesString }
            );
        } catch (error) {
            console.error("Appwrite Service :: updateChat() :: ", error);
            return false;
        }
    }

    async getUserChats(userID) {
        try {
            const response = await this.databases.listDocuments(config.appwriteDatabaseID, config.appwriteCollectionID,
                [
                    Query.equal('user_id', userID)
                ]
            );
            console.log(response);
            let docs=response.documents;
            docs.forEach(element => {
                let newMessages=[];
                
                element.messages.forEach(element2 => {
                    newMessages.push(JSON.parse(element2));
                });
                element.messages=newMessages;
            });
            return docs;

        } catch (error) {
            console.error("Appwrite Service :: getUserChats() :: ", error);
            return false;
        }
    }

    async getChatById(chatID) {
        try {
            const chat = await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                chatID
            );

            return { ...chat, messages: JSON.parse(chat.messages) }; // Convert back to array
        } catch (error) {
            if (error.code === 404) {
                return null; // Chat not found
            }
            console.error("Appwrite Service :: getChatById() :: ", error);
            return false;
        }
    }
}

const dataService = new databaseService();
export default dataService;
