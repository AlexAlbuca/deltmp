/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { combineLatest } from 'rxjs';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { UrlTree } from '../url_tree';
const INITIAL_VALUE = /* @__PURE__ */ Symbol('INITIAL_VALUE');
export function prioritizedGuardValue() {
    return switchMap(obs => {
        return combineLatest(obs.map(o => o.pipe(take(1), startWith(INITIAL_VALUE))))
            .pipe(map((results) => {
            for (const result of results) {
                if (result === true) {
                    // If result is true, check the next one
                    continue;
                }
                else if (result === INITIAL_VALUE) {
                    // If guard has not finished, we need to stop processing.
                    return INITIAL_VALUE;
                }
                else if (result === false || result instanceof UrlTree) {
                    // Result finished and was not true. Return the result.
                    // Note that we only allow false/UrlTree. Other values are considered invalid and
                    // ignored.
                    return result;
                }
            }
            // Everything resolved to true. Return true.
            return true;
        }), filter((item) => item !== INITIAL_VALUE), take(1));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpb3JpdGl6ZWRfZ3VhcmRfdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvc3JjL29wZXJhdG9ycy9wcmlvcml0aXplZF9ndWFyZF92YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsYUFBYSxFQUErQixNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFcEMsTUFBTSxhQUFhLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUc5RCxNQUFNLFVBQVUscUJBQXFCO0lBRW5DLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsYUFBK0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxRixJQUFJLENBQ0QsR0FBRyxDQUFDLENBQUMsT0FBeUIsRUFBRSxFQUFFO1lBQ2hDLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUM1QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQ25CLHdDQUF3QztvQkFDeEMsU0FBUztpQkFDVjtxQkFBTSxJQUFJLE1BQU0sS0FBSyxhQUFhLEVBQUU7b0JBQ25DLHlEQUF5RDtvQkFDekQsT0FBTyxhQUFhLENBQUM7aUJBQ3RCO3FCQUFNLElBQUksTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLFlBQVksT0FBTyxFQUFFO29CQUN4RCx1REFBdUQ7b0JBQ3ZELGlGQUFpRjtvQkFDakYsV0FBVztvQkFDWCxPQUFPLE1BQU0sQ0FBQztpQkFDZjthQUNGO1lBQ0QsNENBQTRDO1lBQzVDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLEVBQ0YsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUEyQixFQUFFLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxFQUNqRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1YsQ0FBQztJQUNSLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIE9wZXJhdG9yRnVuY3Rpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtVcmxUcmVlfSBmcm9tICcuLi91cmxfdHJlZSc7XG5cbmNvbnN0IElOSVRJQUxfVkFMVUUgPSAvKiBAX19QVVJFX18gKi8gU3ltYm9sKCdJTklUSUFMX1ZBTFVFJyk7XG5kZWNsYXJlIHR5cGUgSU5URVJJTV9WQUxVRVMgPSB0eXBlb2YgSU5JVElBTF9WQUxVRSB8IGJvb2xlYW4gfCBVcmxUcmVlO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJpb3JpdGl6ZWRHdWFyZFZhbHVlKCk6XG4gICAgT3BlcmF0b3JGdW5jdGlvbjxPYnNlcnZhYmxlPGJvb2xlYW58VXJsVHJlZT5bXSwgYm9vbGVhbnxVcmxUcmVlPiB7XG4gIHJldHVybiBzd2l0Y2hNYXAob2JzID0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChvYnMubWFwKG8gPT4gby5waXBlKHRha2UoMSksIHN0YXJ0V2l0aChJTklUSUFMX1ZBTFVFIGFzIElOVEVSSU1fVkFMVUVTKSkpKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0czogSU5URVJJTV9WQUxVRVNbXSkgPT4ge1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgcmVzdWx0IGlzIHRydWUsIGNoZWNrIHRoZSBuZXh0IG9uZVxuICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IElOSVRJQUxfVkFMVUUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIGd1YXJkIGhhcyBub3QgZmluaXNoZWQsIHdlIG5lZWQgdG8gc3RvcCBwcm9jZXNzaW5nLlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIElOSVRJQUxfVkFMVUU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlIHx8IHJlc3VsdCBpbnN0YW5jZW9mIFVybFRyZWUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFJlc3VsdCBmaW5pc2hlZCBhbmQgd2FzIG5vdCB0cnVlLiBSZXR1cm4gdGhlIHJlc3VsdC5cbiAgICAgICAgICAgICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBvbmx5IGFsbG93IGZhbHNlL1VybFRyZWUuIE90aGVyIHZhbHVlcyBhcmUgY29uc2lkZXJlZCBpbnZhbGlkIGFuZFxuICAgICAgICAgICAgICAgICAgLy8gaWdub3JlZC5cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEV2ZXJ5dGhpbmcgcmVzb2x2ZWQgdG8gdHJ1ZS4gUmV0dXJuIHRydWUuXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBmaWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIGJvb2xlYW58VXJsVHJlZSA9PiBpdGVtICE9PSBJTklUSUFMX1ZBTFVFKSxcbiAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICk7XG4gIH0pO1xufVxuIl19