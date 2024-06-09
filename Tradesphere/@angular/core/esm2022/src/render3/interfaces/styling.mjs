/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertNumber, assertNumberInRange } from '../../util/assert';
export function toTStylingRange(prev, next) {
    ngDevMode && assertNumberInRange(prev, 0, 32767 /* StylingRange.UNSIGNED_MASK */);
    ngDevMode && assertNumberInRange(next, 0, 32767 /* StylingRange.UNSIGNED_MASK */);
    return (prev << 17 /* StylingRange.PREV_SHIFT */ | next << 2 /* StylingRange.NEXT_SHIFT */);
}
export function getTStylingRangePrev(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange >> 17 /* StylingRange.PREV_SHIFT */) & 32767 /* StylingRange.UNSIGNED_MASK */;
}
export function getTStylingRangePrevDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange & 2 /* StylingRange.PREV_DUPLICATE */) == 2 /* StylingRange.PREV_DUPLICATE */;
}
export function setTStylingRangePrev(tStylingRange, previous) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    ngDevMode && assertNumberInRange(previous, 0, 32767 /* StylingRange.UNSIGNED_MASK */);
    return ((tStylingRange & ~4294836224 /* StylingRange.PREV_MASK */) | (previous << 17 /* StylingRange.PREV_SHIFT */));
}
export function setTStylingRangePrevDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange | 2 /* StylingRange.PREV_DUPLICATE */);
}
export function getTStylingRangeNext(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange & 131068 /* StylingRange.NEXT_MASK */) >> 2 /* StylingRange.NEXT_SHIFT */;
}
export function setTStylingRangeNext(tStylingRange, next) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    ngDevMode && assertNumberInRange(next, 0, 32767 /* StylingRange.UNSIGNED_MASK */);
    return ((tStylingRange & ~131068 /* StylingRange.NEXT_MASK */) | //
        next << 2 /* StylingRange.NEXT_SHIFT */);
}
export function getTStylingRangeNextDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return ((tStylingRange) & 1 /* StylingRange.NEXT_DUPLICATE */) === 1 /* StylingRange.NEXT_DUPLICATE */;
}
export function setTStylingRangeNextDuplicate(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    return (tStylingRange | 1 /* StylingRange.NEXT_DUPLICATE */);
}
export function getTStylingRangeTail(tStylingRange) {
    ngDevMode && assertNumber(tStylingRange, 'expected number');
    const next = getTStylingRangeNext(tStylingRange);
    return next === 0 ? getTStylingRangePrev(tStylingRange) : next;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9zdHlsaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQXVKcEUsTUFBTSxVQUFVLGVBQWUsQ0FBQyxJQUFZLEVBQUUsSUFBWTtJQUN4RCxTQUFTLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMseUNBQTZCLENBQUM7SUFDdEUsU0FBUyxJQUFJLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDLHlDQUE2QixDQUFDO0lBQ3RFLE9BQU8sQ0FBQyxJQUFJLG9DQUEyQixHQUFHLElBQUksbUNBQTJCLENBQWtCLENBQUM7QUFDOUYsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxhQUE0QjtJQUMvRCxTQUFTLElBQUksWUFBWSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzVELE9BQU8sQ0FBQyxhQUFhLG9DQUEyQixDQUFDLHlDQUE2QixDQUFDO0FBQ2pGLENBQUM7QUFFRCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsYUFBNEI7SUFDeEUsU0FBUyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM1RCxPQUFPLENBQUMsYUFBYSxzQ0FBOEIsQ0FBQyx1Q0FBK0IsQ0FBQztBQUN0RixDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUNoQyxhQUE0QixFQUFFLFFBQWdCO0lBQ2hELFNBQVMsSUFBSSxZQUFZLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDNUQsU0FBUyxJQUFJLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDLHlDQUE2QixDQUFDO0lBQzFFLE9BQU8sQ0FBQyxDQUFDLGFBQWEsR0FBRyx3Q0FBdUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxvQ0FBMkIsQ0FBQyxDQUN4RSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsYUFBNEI7SUFDeEUsU0FBUyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM1RCxPQUFPLENBQUMsYUFBYSxzQ0FBOEIsQ0FBa0IsQ0FBQztBQUN4RSxDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLGFBQTRCO0lBQy9ELFNBQVMsSUFBSSxZQUFZLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDNUQsT0FBTyxDQUFDLGFBQWEsc0NBQXlCLENBQUMsbUNBQTJCLENBQUM7QUFDN0UsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxhQUE0QixFQUFFLElBQVk7SUFDN0UsU0FBUyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM1RCxTQUFTLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMseUNBQTZCLENBQUM7SUFDdEUsT0FBTyxDQUFDLENBQUMsYUFBYSxHQUFHLG9DQUF1QixDQUFDLEdBQUksRUFBRTtRQUMvQyxJQUFJLG1DQUEyQixDQUFrQixDQUFDO0FBQzVELENBQUM7QUFFRCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsYUFBNEI7SUFDeEUsU0FBUyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM1RCxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsc0NBQThCLENBQUMsd0NBQWdDLENBQUM7QUFDekYsQ0FBQztBQUVELE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxhQUE0QjtJQUN4RSxTQUFTLElBQUksWUFBWSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzVELE9BQU8sQ0FBQyxhQUFhLHNDQUE4QixDQUFrQixDQUFDO0FBQ3hFLENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsYUFBNEI7SUFDL0QsU0FBUyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM1RCxNQUFNLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDakUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0tleVZhbHVlQXJyYXl9IGZyb20gJy4uLy4uL3V0aWwvYXJyYXlfdXRpbHMnO1xuaW1wb3J0IHthc3NlcnROdW1iZXIsIGFzc2VydE51bWJlckluUmFuZ2V9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcblxuLyoqXG4gKiBWYWx1ZSBzdG9yZWQgaW4gdGhlIGBURGF0YWAgd2hpY2ggaXMgbmVlZGVkIHRvIHJlLWNvbmNhdGVuYXRlIHRoZSBzdHlsaW5nLlxuICpcbiAqIFNlZTogYFRTdHlsaW5nS2V5UHJpbWl0aXZlYCBhbmQgYFRTdHlsaW5nU3RhdGljYFxuICovXG5leHBvcnQgdHlwZSBUU3R5bGluZ0tleSA9IFRTdHlsaW5nS2V5UHJpbWl0aXZlfFRTdHlsaW5nU3RhdGljO1xuXG5cbi8qKlxuICogVGhlIHByaW1pdGl2ZSBwb3J0aW9uIChgVFN0eWxpbmdTdGF0aWNgIHJlbW92ZWQpIG9mIHRoZSB2YWx1ZSBzdG9yZWQgaW4gdGhlIGBURGF0YWAgd2hpY2ggaXNcbiAqIG5lZWRlZCB0byByZS1jb25jYXRlbmF0ZSB0aGUgc3R5bGluZy5cbiAqXG4gKiAtIGBzdHJpbmdgOiBTdG9yZXMgdGhlIHByb3BlcnR5IG5hbWUuIFVzZWQgd2l0aCBgybXJtXN0eWxlUHJvcGAvYMm1ybVjbGFzc1Byb3BgIGluc3RydWN0aW9uLlxuICogLSBgbnVsbGA6IFJlcHJlc2VudHMgbWFwLCBzbyB0aGVyZSBpcyBubyBuYW1lLiBVc2VkIHdpdGggYMm1ybVzdHlsZU1hcGAvYMm1ybVjbGFzc01hcGAuXG4gKiAtIGBmYWxzZWA6IFJlcHJlc2VudHMgYW4gaWdub3JlIGNhc2UuIFRoaXMgaGFwcGVucyB3aGVuIGDJtcm1c3R5bGVQcm9wYC9gybXJtWNsYXNzUHJvcGAgaW5zdHJ1Y3Rpb25cbiAqICAgaXMgY29tYmluZWQgd2l0aCBkaXJlY3RpdmUgd2hpY2ggc2hhZG93cyBpdHMgaW5wdXQgYEBJbnB1dCgnY2xhc3MnKWAuIFRoYXQgd2F5IHRoZSBiaW5kaW5nXG4gKiAgIHNob3VsZCBub3QgcGFydGljaXBhdGUgaW4gdGhlIHN0eWxpbmcgcmVzb2x1dGlvbi5cbiAqL1xuZXhwb3J0IHR5cGUgVFN0eWxpbmdLZXlQcmltaXRpdmUgPSBzdHJpbmd8bnVsbHxmYWxzZTtcblxuLyoqXG4gKiBTdG9yZSB0aGUgc3RhdGljIHZhbHVlcyBmb3IgdGhlIHN0eWxpbmcgYmluZGluZy5cbiAqXG4gKiBUaGUgYFRTdHlsaW5nU3RhdGljYCBpcyBqdXN0IGBLZXlWYWx1ZUFycmF5YCB3aGVyZSBrZXkgYFwiXCJgIChzdG9yZWQgYXQgbG9jYXRpb24gMCkgY29udGFpbnMgdGhlXG4gKiBgVFN0eWxpbmdLZXlgIChzdG9yZWQgYXQgbG9jYXRpb24gMSkuIEluIG90aGVyIHdvcmRzIHRoaXMgd3JhcHMgdGhlIGBUU3R5bGluZ0tleWAgc3VjaCB0aGF0IHRoZVxuICogYFwiXCJgIGNvbnRhaW5zIHRoZSB3cmFwcGVkIHZhbHVlLlxuICpcbiAqIFdoZW4gaW5zdHJ1Y3Rpb25zIGFyZSByZXNvbHZpbmcgc3R5bGluZyB0aGV5IG1heSBuZWVkIHRvIGxvb2sgZm9yd2FyZCBvciBiYWNrd2FyZHMgaW4gdGhlIGxpbmtlZFxuICogbGlzdCB0byByZXNvbHZlIHRoZSB2YWx1ZS4gRm9yIHRoaXMgcmVhc29uIHdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgaGUgbGlua2VkIGxpc3QgYWxzbyBjb250YWluc1xuICogdGhlIHN0YXRpYyB2YWx1ZXMuIEhvd2V2ZXIgdGhlIGxpc3Qgb25seSBoYXMgc3BhY2UgZm9yIG9uZSBpdGVtIHBlciBzdHlsaW5nIGluc3RydWN0aW9uLiBGb3IgdGhpc1xuICogcmVhc29uIHdlIHN0b3JlIHRoZSBzdGF0aWMgdmFsdWVzIGhlcmUgYXMgcGFydCBvZiB0aGUgYFRTdHlsaW5nS2V5YC4gVGhpcyBtZWFucyB0aGF0IHRoZVxuICogcmVzb2x1dGlvbiBmdW5jdGlvbiB3aGVuIGxvb2tpbmcgZm9yIGEgdmFsdWUgbmVlZHMgdG8gZmlyc3QgbG9vayBhdCB0aGUgYmluZGluZyB2YWx1ZSwgYW5kIHRoYW5cbiAqIGF0IGBUU3R5bGluZ0tleWAgKGlmIGl0IGV4aXN0cykuXG4gKlxuICogSW1hZ2luZSB3ZSBoYXZlOlxuICpcbiAqIGBgYFxuICogPGRpdiBjbGFzcz1cIlRFTVBMQVRFXCIgbXktZGlyPlxuICpcbiAqIEBEaXJlY3RpdmUoe1xuICogICBob3N0OiB7XG4gKiAgICAgY2xhc3M6ICdESVInLFxuICogICAgICdbY2xhc3MuZHluYW1pY10nOiAnZXhwJyAvLyDJtcm1Y2xhc3NQcm9wKCdkeW5hbWljJywgY3R4LmV4cCk7XG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBJbiB0aGUgYWJvdmUgY2FzZSB0aGUgbGlua2VkIGxpc3Qgd2lsbCBjb250YWluIG9uZSBpdGVtOlxuICpcbiAqIGBgYFxuICogICAvLyBhc3N1bWUgYmluZGluZyBsb2NhdGlvbjogMTAgZm9yIGDJtcm1Y2xhc3NQcm9wKCdkeW5hbWljJywgY3R4LmV4cCk7YFxuICogICB0RGF0YVsxMF0gPSA8VFN0eWxpbmdTdGF0aWM+W1xuICogICAgICcnOiAnZHluYW1pYycsIC8vIFRoaXMgaXMgdGhlIHdyYXBwZWQgdmFsdWUgb2YgYFRTdHlsaW5nS2V5YFxuICogICAgICdESVInOiB0cnVlLCAgIC8vIFRoaXMgaXMgdGhlIGRlZmF1bHQgc3RhdGljIHZhbHVlIG9mIGRpcmVjdGl2ZSBiaW5kaW5nLlxuICogICBdO1xuICogICB0RGF0YVsxMCArIDFdID0gMDsgLy8gV2UgZG9uJ3QgaGF2ZSBwcmV2L25leHQuXG4gKlxuICogICBsVmlld1sxMF0gPSB1bmRlZmluZWQ7ICAgICAvLyBhc3N1bWUgYGN0eC5leHBgIGlzIGB1bmRlZmluZWRgXG4gKiAgIGxWaWV3WzEwICsgMV0gPSB1bmRlZmluZWQ7IC8vIEp1c3Qgbm9ybWFsaXplZCBgbFZpZXdbMTBdYFxuICogYGBgXG4gKlxuICogU28gd2hlbiB0aGUgZnVuY3Rpb24gaXMgcmVzb2x2aW5nIHN0eWxpbmcgdmFsdWUsIGl0IGZpcnN0IG5lZWRzIHRvIGxvb2sgaW50byB0aGUgbGlua2VkIGxpc3RcbiAqICh0aGVyZSBpcyBub25lKSBhbmQgdGhhbiBpbnRvIHRoZSBzdGF0aWMgYFRTdHlsaW5nU3RhdGljYCB0b28gc2VlIGlmIHRoZXJlIGlzIGEgZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIGBkeW5hbWljYCAodGhlcmUgaXMgbm90KS4gVGhlcmVmb3JlIGl0IGlzIHNhZmUgdG8gcmVtb3ZlIGl0LlxuICpcbiAqIElmIHNldHRpbmcgYHRydWVgIGNhc2U6XG4gKiBgYGBcbiAqICAgbFZpZXdbMTBdID0gdHJ1ZTsgICAgIC8vIGFzc3VtZSBgY3R4LmV4cGAgaXMgYHRydWVgXG4gKiAgIGxWaWV3WzEwICsgMV0gPSB0cnVlOyAvLyBKdXN0IG5vcm1hbGl6ZWQgYGxWaWV3WzEwXWBcbiAqIGBgYFxuICogU28gd2hlbiB0aGUgZnVuY3Rpb24gaXMgcmVzb2x2aW5nIHN0eWxpbmcgdmFsdWUsIGl0IGZpcnN0IG5lZWRzIHRvIGxvb2sgaW50byB0aGUgbGlua2VkIGxpc3RcbiAqICh0aGVyZSBpcyBub25lKSBhbmQgdGhhbiBpbnRvIGBUTm9kZS5yZXNpZHVhbENsYXNzYCAoVE5vZGUucmVzaWR1YWxTdHlsZSkgd2hpY2ggY29udGFpbnNcbiAqIGBgYFxuICogICB0Tm9kZS5yZXNpZHVhbENsYXNzID0gW1xuICogICAgICdURU1QTEFURSc6IHRydWUsXG4gKiAgIF07XG4gKiBgYGBcbiAqXG4gKiBUaGlzIG1lYW5zIHRoYXQgaXQgaXMgc2FmZSB0byBhZGQgY2xhc3MuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVFN0eWxpbmdTdGF0aWMgZXh0ZW5kcyBLZXlWYWx1ZUFycmF5PGFueT4ge31cblxuLyoqXG4gKiBUaGlzIGlzIGEgYnJhbmRlZCBudW1iZXIgd2hpY2ggY29udGFpbnMgcHJldmlvdXMgYW5kIG5leHQgaW5kZXguXG4gKlxuICogV2hlbiB3ZSBjb21lIGFjcm9zcyBzdHlsaW5nIGluc3RydWN0aW9ucyB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBgVFN0eWxpbmdLZXlgIGluIHRoZSBjb3JyZWN0XG4gKiBvcmRlciBzbyB0aGF0IHdlIGNhbiByZS1jb25jYXRlbmF0ZSB0aGUgc3R5bGluZyB2YWx1ZSBpbiB0aGUgZGVzaXJlZCBwcmlvcml0eS5cbiAqXG4gKiBUaGUgaW5zZXJ0aW9uIGNhbiBoYXBwZW4gZWl0aGVyIGF0IHRoZTpcbiAqIC0gZW5kIG9mIHRlbXBsYXRlIGFzIGluIHRoZSBjYXNlIG9mIGNvbWluZyBhY3Jvc3MgYWRkaXRpb25hbCBzdHlsaW5nIGluc3RydWN0aW9uIGluIHRoZSB0ZW1wbGF0ZVxuICogLSBpbiBmcm9udCBvZiB0aGUgdGVtcGxhdGUgaW4gdGhlIGNhc2Ugb2YgY29taW5nIGFjcm9zcyBhZGRpdGlvbmFsIGluc3RydWN0aW9uIGluIHRoZVxuICogICBgaG9zdEJpbmRpbmdzYC5cbiAqXG4gKiBXZSB1c2UgYFRTdHlsaW5nUmFuZ2VgIHRvIHN0b3JlIHRoZSBwcmV2aW91cyBhbmQgbmV4dCBpbmRleCBpbnRvIHRoZSBgVERhdGFgIHdoZXJlIHRoZSB0ZW1wbGF0ZVxuICogYmluZGluZ3MgY2FuIGJlIGZvdW5kLlxuICpcbiAqIC0gYml0IDAgaXMgdXNlZCB0byBtYXJrIHRoYXQgdGhlIHByZXZpb3VzIGluZGV4IGhhcyBhIGR1cGxpY2F0ZSBmb3IgY3VycmVudCB2YWx1ZS5cbiAqIC0gYml0IDEgaXMgdXNlZCB0byBtYXJrIHRoYXQgdGhlIG5leHQgaW5kZXggaGFzIGEgZHVwbGljYXRlIGZvciB0aGUgY3VycmVudCB2YWx1ZS5cbiAqIC0gYml0cyAyLTE2IGFyZSB1c2VkIHRvIGVuY29kZSB0aGUgbmV4dC90YWlsIG9mIHRoZSB0ZW1wbGF0ZS5cbiAqIC0gYml0cyAxNy0zMiBhcmUgdXNlZCB0byBlbmNvZGUgdGhlIHByZXZpb3VzL2hlYWQgb2YgdGVtcGxhdGUuXG4gKlxuICogTk9ERTogKmR1cGxpY2F0ZSogZmFsc2UgaW1wbGllcyB0aGF0IGl0IGlzIHN0YXRpY2FsbHkga25vd24gdGhhdCB0aGlzIGJpbmRpbmcgd2lsbCBub3QgY29sbGlkZVxuICogd2l0aCBvdGhlciBiaW5kaW5ncyBhbmQgdGhlcmVmb3JlIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2hlY2sgb3RoZXIgYmluZGluZ3MuIEZvciBleGFtcGxlIHRoZVxuICogYmluZGluZ3MgaW4gYDxkaXYgW3N0eWxlLmNvbG9yXT1cImV4cFwiIFtzdHlsZS53aWR0aF09XCJleHBcIj5gIHdpbGwgbmV2ZXIgY29sbGlkZSBhbmQgd2lsbCBoYXZlXG4gKiB0aGVpciBiaXRzIHNldCBhY2NvcmRpbmdseS4gUHJldmlvdXMgZHVwbGljYXRlIG1lYW5zIHRoYXQgd2UgbWF5IG5lZWQgdG8gY2hlY2sgcHJldmlvdXMgaWYgdGhlXG4gKiBjdXJyZW50IGJpbmRpbmcgaXMgYG51bGxgLiBOZXh0IGR1cGxpY2F0ZSBtZWFucyB0aGF0IHdlIG1heSBuZWVkIHRvIGNoZWNrIG5leHQgYmluZGluZ3MgaWYgdGhlXG4gKiBjdXJyZW50IGJpbmRpbmcgaXMgbm90IGBudWxsYC5cbiAqXG4gKiBOT1RFOiBgMGAgaGFzIHNwZWNpYWwgc2lnbmlmaWNhbmNlIGFuZCByZXByZXNlbnRzIGBudWxsYCBhcyBpbiBubyBhZGRpdGlvbmFsIHBvaW50ZXIuXG4gKi9cbmV4cG9ydCB0eXBlIFRTdHlsaW5nUmFuZ2UgPSBudW1iZXIme1xuICBfX2JyYW5kX186ICdUU3R5bGluZ1JhbmdlJztcbn07XG5cbi8qKlxuICogU2hpZnQgYW5kIG1hc2tzIGNvbnN0YW50cyBmb3IgZW5jb2RpbmcgdHdvIG51bWJlcnMgaW50byBhbmQgZHVwbGljYXRlIGluZm8gaW50byBhIHNpbmdsZSBudW1iZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFN0eWxpbmdSYW5nZSB7XG4gIC8vLyBOdW1iZXIgb2YgYml0cyB0byBzaGlmdCBmb3IgdGhlIHByZXZpb3VzIHBvaW50ZXJcbiAgUFJFVl9TSElGVCA9IDE3LFxuICAvLy8gUHJldmlvdXMgcG9pbnRlciBtYXNrLlxuICBQUkVWX01BU0sgPSAweEZGRkUwMDAwLFxuXG4gIC8vLyBOdW1iZXIgb2YgYml0cyB0byBzaGlmdCBmb3IgdGhlIG5leHQgcG9pbnRlclxuICBORVhUX1NISUZUID0gMixcbiAgLy8vIE5leHQgcG9pbnRlciBtYXNrLlxuICBORVhUX01BU0sgPSAweDAwMUZGRkMsXG5cbiAgLy8gTWFzayB0byByZW1vdmUgbmVnYXRpdmUgYml0LiAoaW50ZXJwcmV0IG51bWJlciBhcyBwb3NpdGl2ZSlcbiAgVU5TSUdORURfTUFTSyA9IDB4N0ZGRixcblxuICAvKipcbiAgICogVGhpcyBiaXQgaXMgc2V0IGlmIHRoZSBwcmV2aW91cyBiaW5kaW5ncyBjb250YWlucyBhIGJpbmRpbmcgd2hpY2ggY291bGQgcG9zc2libHkgY2F1c2UgYVxuICAgKiBkdXBsaWNhdGUuIEZvciBleGFtcGxlOiBgPGRpdiBbc3R5bGVdPVwibWFwXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoXCI+YCwgdGhlIGB3aWR0aGAgYmluZGluZyB3aWxsXG4gICAqIGhhdmUgcHJldmlvdXMgZHVwbGljYXRlIHNldC4gVGhlIGltcGxpY2F0aW9uIGlzIHRoYXQgaWYgYHdpZHRoYCBiaW5kaW5nIGJlY29tZXMgYG51bGxgLCBpdCBpc1xuICAgKiBuZWNlc3NhcnkgdG8gZGVmZXIgdGhlIHZhbHVlIHRvIGBtYXAud2lkdGhgLiAoQmVjYXVzZSBgd2lkdGhgIG92ZXJ3cml0ZXMgYG1hcC53aWR0aGAuKVxuICAgKi9cbiAgUFJFVl9EVVBMSUNBVEUgPSAweDAyLFxuXG4gIC8qKlxuICAgKiBUaGlzIGJpdCBpcyBzZXQgdG8gaWYgdGhlIG5leHQgYmluZGluZyBjb250YWlucyBhIGJpbmRpbmcgd2hpY2ggY291bGQgcG9zc2libHkgY2F1c2UgYVxuICAgKiBkdXBsaWNhdGUuIEZvciBleGFtcGxlOiBgPGRpdiBbc3R5bGVdPVwibWFwXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoXCI+YCwgdGhlIGBtYXBgIGJpbmRpbmcgd2lsbFxuICAgKiBoYXZlIG5leHQgZHVwbGljYXRlIHNldC4gVGhlIGltcGxpY2F0aW9uIGlzIHRoYXQgaWYgYG1hcC53aWR0aGAgYmluZGluZyBiZWNvbWVzIG5vdCBgbnVsbGAsIGl0XG4gICAqIGlzIG5lY2Vzc2FyeSB0byBkZWZlciB0aGUgdmFsdWUgdG8gYHdpZHRoYC4gKEJlY2F1c2UgYHdpZHRoYCBvdmVyd3JpdGVzIGBtYXAud2lkdGhgLilcbiAgICovXG4gIE5FWFRfRFVQTElDQVRFID0gMHgwMSxcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdG9UU3R5bGluZ1JhbmdlKHByZXY6IG51bWJlciwgbmV4dDogbnVtYmVyKTogVFN0eWxpbmdSYW5nZSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXJJblJhbmdlKHByZXYsIDAsIFN0eWxpbmdSYW5nZS5VTlNJR05FRF9NQVNLKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlckluUmFuZ2UobmV4dCwgMCwgU3R5bGluZ1JhbmdlLlVOU0lHTkVEX01BU0spO1xuICByZXR1cm4gKHByZXYgPDwgU3R5bGluZ1JhbmdlLlBSRVZfU0hJRlQgfCBuZXh0IDw8IFN0eWxpbmdSYW5nZS5ORVhUX1NISUZUKSBhcyBUU3R5bGluZ1JhbmdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VFN0eWxpbmdSYW5nZVByZXYodFN0eWxpbmdSYW5nZTogVFN0eWxpbmdSYW5nZSk6IG51bWJlciB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXIodFN0eWxpbmdSYW5nZSwgJ2V4cGVjdGVkIG51bWJlcicpO1xuICByZXR1cm4gKHRTdHlsaW5nUmFuZ2UgPj4gU3R5bGluZ1JhbmdlLlBSRVZfU0hJRlQpICYgU3R5bGluZ1JhbmdlLlVOU0lHTkVEX01BU0s7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUU3R5bGluZ1JhbmdlUHJldkR1cGxpY2F0ZSh0U3R5bGluZ1JhbmdlOiBUU3R5bGluZ1JhbmdlKTogYm9vbGVhbiB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXIodFN0eWxpbmdSYW5nZSwgJ2V4cGVjdGVkIG51bWJlcicpO1xuICByZXR1cm4gKHRTdHlsaW5nUmFuZ2UgJiBTdHlsaW5nUmFuZ2UuUFJFVl9EVVBMSUNBVEUpID09IFN0eWxpbmdSYW5nZS5QUkVWX0RVUExJQ0FURTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRTdHlsaW5nUmFuZ2VQcmV2KFxuICAgIHRTdHlsaW5nUmFuZ2U6IFRTdHlsaW5nUmFuZ2UsIHByZXZpb3VzOiBudW1iZXIpOiBUU3R5bGluZ1JhbmdlIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlcih0U3R5bGluZ1JhbmdlLCAnZXhwZWN0ZWQgbnVtYmVyJyk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXJJblJhbmdlKHByZXZpb3VzLCAwLCBTdHlsaW5nUmFuZ2UuVU5TSUdORURfTUFTSyk7XG4gIHJldHVybiAoKHRTdHlsaW5nUmFuZ2UgJiB+U3R5bGluZ1JhbmdlLlBSRVZfTUFTSykgfCAocHJldmlvdXMgPDwgU3R5bGluZ1JhbmdlLlBSRVZfU0hJRlQpKSBhc1xuICAgICAgVFN0eWxpbmdSYW5nZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRTdHlsaW5nUmFuZ2VQcmV2RHVwbGljYXRlKHRTdHlsaW5nUmFuZ2U6IFRTdHlsaW5nUmFuZ2UpOiBUU3R5bGluZ1JhbmdlIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlcih0U3R5bGluZ1JhbmdlLCAnZXhwZWN0ZWQgbnVtYmVyJyk7XG4gIHJldHVybiAodFN0eWxpbmdSYW5nZSB8IFN0eWxpbmdSYW5nZS5QUkVWX0RVUExJQ0FURSkgYXMgVFN0eWxpbmdSYW5nZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRTdHlsaW5nUmFuZ2VOZXh0KHRTdHlsaW5nUmFuZ2U6IFRTdHlsaW5nUmFuZ2UpOiBudW1iZXIge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TnVtYmVyKHRTdHlsaW5nUmFuZ2UsICdleHBlY3RlZCBudW1iZXInKTtcbiAgcmV0dXJuICh0U3R5bGluZ1JhbmdlICYgU3R5bGluZ1JhbmdlLk5FWFRfTUFTSykgPj4gU3R5bGluZ1JhbmdlLk5FWFRfU0hJRlQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUU3R5bGluZ1JhbmdlTmV4dCh0U3R5bGluZ1JhbmdlOiBUU3R5bGluZ1JhbmdlLCBuZXh0OiBudW1iZXIpOiBUU3R5bGluZ1JhbmdlIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlcih0U3R5bGluZ1JhbmdlLCAnZXhwZWN0ZWQgbnVtYmVyJyk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXJJblJhbmdlKG5leHQsIDAsIFN0eWxpbmdSYW5nZS5VTlNJR05FRF9NQVNLKTtcbiAgcmV0dXJuICgodFN0eWxpbmdSYW5nZSAmIH5TdHlsaW5nUmFuZ2UuTkVYVF9NQVNLKSB8ICAvL1xuICAgICAgICAgIG5leHQgPDwgU3R5bGluZ1JhbmdlLk5FWFRfU0hJRlQpIGFzIFRTdHlsaW5nUmFuZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUU3R5bGluZ1JhbmdlTmV4dER1cGxpY2F0ZSh0U3R5bGluZ1JhbmdlOiBUU3R5bGluZ1JhbmdlKTogYm9vbGVhbiB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROdW1iZXIodFN0eWxpbmdSYW5nZSwgJ2V4cGVjdGVkIG51bWJlcicpO1xuICByZXR1cm4gKCh0U3R5bGluZ1JhbmdlKSAmIFN0eWxpbmdSYW5nZS5ORVhUX0RVUExJQ0FURSkgPT09IFN0eWxpbmdSYW5nZS5ORVhUX0RVUExJQ0FURTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFRTdHlsaW5nUmFuZ2VOZXh0RHVwbGljYXRlKHRTdHlsaW5nUmFuZ2U6IFRTdHlsaW5nUmFuZ2UpOiBUU3R5bGluZ1JhbmdlIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE51bWJlcih0U3R5bGluZ1JhbmdlLCAnZXhwZWN0ZWQgbnVtYmVyJyk7XG4gIHJldHVybiAodFN0eWxpbmdSYW5nZSB8IFN0eWxpbmdSYW5nZS5ORVhUX0RVUExJQ0FURSkgYXMgVFN0eWxpbmdSYW5nZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRTdHlsaW5nUmFuZ2VUYWlsKHRTdHlsaW5nUmFuZ2U6IFRTdHlsaW5nUmFuZ2UpOiBudW1iZXIge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TnVtYmVyKHRTdHlsaW5nUmFuZ2UsICdleHBlY3RlZCBudW1iZXInKTtcbiAgY29uc3QgbmV4dCA9IGdldFRTdHlsaW5nUmFuZ2VOZXh0KHRTdHlsaW5nUmFuZ2UpO1xuICByZXR1cm4gbmV4dCA9PT0gMCA/IGdldFRTdHlsaW5nUmFuZ2VQcmV2KHRTdHlsaW5nUmFuZ2UpIDogbmV4dDtcbn1cbiJdfQ==