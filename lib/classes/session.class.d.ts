import express from "express";
export default class SessionClass {
    static init(callback?: () => void): (request: express.Request) => Promise<void>;
}
