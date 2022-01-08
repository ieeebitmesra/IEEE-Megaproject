import * as vscode from "vscode";
import { apiBaseUrl } from "./constants";
import * as polka from 'polka';
import { TokenManager } from "./TokenManager";

export const authenticate = ( fn: ()=>void)=>{
    const app = polka();

    app.get("/auth/:token", async(req, res)=>{
        const {token} = req.params;
        if(!token){
            res.end("<h1>Something Went Wrong</h1>");
            return;
        }


        await TokenManager.setToken(token);
        res.end("<h1>Auth Successful</h1><br />You can close this now");
        
        (app as any).server.close();
        fn();
    });

    app.listen(64589,(err:Error)=>{
        if(err){
            vscode.window.showErrorMessage(err.message);
        }
    });
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(`${apiBaseUrl}/auth/github`));
};