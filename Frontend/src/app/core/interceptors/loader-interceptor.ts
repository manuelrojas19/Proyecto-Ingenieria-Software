import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler):
        Observable<HttpEvent<any>> {
        this.loaderService.setLoading(true, req.url);
        // return next.handle(request)
        //     .pipe(catchError((err) => {
        //         this._loading.setLoading(false, request.url);
        //         return err;
        //     }))
        //     .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        //         if (evt instanceof HttpResponse) {
        //             this._loading.setLoading(false, request.url);
        //         }
        //         return evt;
        //     }));
        return next.handle(req)
            .pipe(finalize(() => {
                this.loaderService.setLoading(false, req.url);
            }));
    }
}
