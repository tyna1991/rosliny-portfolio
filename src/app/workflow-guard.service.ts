import { Injectable } from '@angular/core';
import {
    CanActivate, Router, ActivatedRoute,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanLoad, Route
} from '@angular/router';
 
import { WorkflowService } from './workflow.service';
 
@Injectable()
export class WorkflowGuard implements CanActivate {
    constructor(private router: Router, private workflowService: WorkflowService, private activeRoute:ActivatedRoute) {
        
     }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let path: string = route.routeConfig.path;
        const tree = this.router.parseUrl(state.url);
        let parentPath:string = tree.root.children.primary.segments[0].path;
        if(tree.root.children.primary.segments[0].path=='edit'){
            parentPath=parentPath+'/'+tree.root.children.primary.segments[1].path;
        }
        return this.verifyWorkFlow(path, parentPath);
    }
 
    verifyWorkFlow(path, parentPath) : boolean {
        console.log("Entered '" + path + "' path.");
 
        // If any of the previous steps is invalid, go back to the first invalid step
        let firstPath = this.workflowService.getFirstInvalidStep(path);
        if (firstPath.length > 0) {
            console.log("Redirected to '" + firstPath + "' path which it is the first invalid step.");
            let url = `./${parentPath}/${firstPath}`;

            console.log(url);
            this.router.navigate([url],{relativeTo: this.activeRoute});
            return false;
        };
 
        return true;
    }
}