import _superagent, { Request, Response } from 'superagent';
import superagentPromise from "superagent-promise";
import { SignupDto } from './src/DTOs/incoming/signup.dto';
import { ArrivalLogDto } from './src/DTOs/incoming/arrivalLog.dto';
import { DepartureLogDto } from './src/DTOs/incoming/departureLog.dto';
import { UserInfoDto } from './src/DTOs/incoming/userInfo.dto';
import { UpdateTravelLogDto } from './src/DTOs/incoming/updateTravelLog.dto';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = "https://stage-trackerbackend.onrender.com";
// "";
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
    getEligibleDays: () => requests.get("/travel-log/dashboard/eligible-days"),
    getTravelLogs: () => requests.get("/travel-log"),
    getTravelLog: (travelLogId: string) => requests.get(`/travel-log/${travelLogId}`),
    postArrivalLog: (arrivalLog: ArrivalLogDto) => requests.post("/travel-log/arrival", arrivalLog),
    postDepartureLog: (departureLog: DepartureLogDto) => requests.post("/travel-log/departure", departureLog),
    deleteTravelLog: (travelLogId: string) => requests.del(`/travel-log/${travelLogId}`),
    updateTravelLog: (travelLogId: string, updateTravelLog: UpdateTravelLogDto) => requests.put(`/travel-log/${travelLogId}`, updateTravelLog),
};

const User = {
    getCurrentUserInfo: () => requests.get("/user"),
    updateUserInfo: (userInfo: UserInfoDto) => requests.put("/user", userInfo),
};

var _export_agent = {
    Authentication,
    TravelLog,
    User,
    setToken: (_token: string) => { token = _token; },
    removeToken: () => {
        token = null;
    }
};

export default _export_agent;
