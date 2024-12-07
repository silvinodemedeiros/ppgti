import { Pipe, PipeTransform } from "@angular/core";
import { isObservable, map, startWith, catchError, of } from "rxjs";

@Pipe({
    name: 'asyncLoading',
    standalone: true
})
export class AsyncLoadingPipe implements PipeTransform {
    transform(val: any) {
        return isObservable(val)
        ? val.pipe(
            map(value => ({ loading: false, value })),
            startWith({ loading: true }),
            catchError(error => of({ loading: false, error }))
        )
        : val;
    }
}