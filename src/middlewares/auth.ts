import { Response, Request, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
        next()
    }else{
        res.status(401).json('you are not authnticated')
    }

}
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated() && req.user?.role === 'guide'){
        next()
    }else{
        res.status(401).json('not allowed')
    }

}