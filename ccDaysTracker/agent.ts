import _superagent, { Request, Response } from 'superagent';
import superagentPromise from "superagent-promise";
import { SignupDto } from './src/DTOs/incoming/signup.dto';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = "http://localhost:3000";
const responsebody = (res: Response) => res.body;
let token: string | null = null;
const tokenPlugin = (req: Request) => {
    if (token) {
        console.log("tokenPlugin: token is not null");
        req.set("authorization", `Bearer ${token}`);
    }
};

const setMultipartHeader = (req: Request) => {
    req.set("contentType", "multipart/form-data")
}
const requests = {
    del: (url: string) =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responsebody),
    get: (url: string) =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responsebody),
    getWithQueries: (url: string, queryobject: any) => superagent
        .get(`${API_ROOT}${url}`)
        .query(queryobject)
        .use(tokenPlugin)
        .then(responsebody),
    post: (url: string, body: any) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .then(responsebody),
    put: (url: string, body: any) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .then(responsebody),
    putWithAttachment: (url: string, body: any) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .use(setMultipartHeader)
            .then(responsebody),
};

const Authentication = {
    current: () => requests.get("/authentication"),
    login: (email: string, password: string) =>
        requests.post("/authentication/local/login", { email, password }),
    register: (signup: SignupDto) =>
        requests.post("/authentication/local/signup", signup),
};

const TravelLog = {

};

var _export_agent = {
    Authentication,
    setToken: (_token: string) => { token = _token; }
};

export default _export_agent;