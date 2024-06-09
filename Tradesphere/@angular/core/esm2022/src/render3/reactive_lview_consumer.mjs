/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { REACTIVE_NODE } from '../signals';
import { assertDefined } from '../util/assert';
import { markViewDirty } from './instructions/mark_view_dirty';
let currentConsumer = null;
/**
 * Create a new template consumer pointing at the specified LView.
 * Sometimes, a previously created consumer may be reused, in order to save on allocations. In that
 * case, the LView will be updated.
 */
export function getReactiveLViewConsumer(lView, slot) {
    return lView[slot] ?? getOrCreateCurrentLViewConsumer();
}
/**
 * Assigns the `currentTemplateContext` to its LView's `REACTIVE_CONSUMER` slot if there are tracked
 * producers.
 *
 * The presence of producers means that a signal was read while the consumer was the active
 * consumer.
 *
 * If no producers are present, we do not assign the current template context. This also means we
 * can just reuse the template context for the next LView.
 */
export function commitLViewConsumerIfHasProducers(lView, slot) {
    const consumer = getOrCreateCurrentLViewConsumer();
    if (!consumer.producerNode?.length) {
        return;
    }
    lView[slot] = currentConsumer;
    consumer.lView = lView;
    currentConsumer = createLViewConsumer();
}
const REACTIVE_LVIEW_CONSUMER_NODE = {
    ...REACTIVE_NODE,
    consumerIsAlwaysLive: true,
    consumerMarkedDirty: (node) => {
        (typeof ngDevMode === 'undefined' || ngDevMode) &&
            assertDefined(node.lView, 'Updating a signal during template or host binding execution is not allowed.');
        markViewDirty(node.lView);
    },
    lView: null,
};
function createLViewConsumer() {
    return Object.create(REACTIVE_LVIEW_CONSUMER_NODE);
}
function getOrCreateCurrentLViewConsumer() {
    currentConsumer ??= createLViewConsumer();
    return currentConsumer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmVfbHZpZXdfY29uc3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3JlYWN0aXZlX2x2aWV3X2NvbnN1bWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxhQUFhLEVBQWUsTUFBTSxZQUFZLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBYyxNQUFNLGdCQUFnQixDQUFDO0FBRTFELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUc3RCxJQUFJLGVBQWUsR0FBK0IsSUFBSSxDQUFDO0FBS3ZEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQ3BDLEtBQVksRUFBRSxJQUE2RTtJQUU3RixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBK0IsRUFBRSxDQUFDO0FBQzFELENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsaUNBQWlDLENBQzdDLEtBQVksRUFDWixJQUE2RTtJQUMvRSxNQUFNLFFBQVEsR0FBRywrQkFBK0IsRUFBRSxDQUFDO0lBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRTtRQUNsQyxPQUFPO0tBQ1I7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDO0lBQzlCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLGVBQWUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO0FBQzFDLENBQUM7QUFFRCxNQUFNLDRCQUE0QixHQUEwQjtJQUMxRCxHQUFHLGFBQWE7SUFDaEIsb0JBQW9CLEVBQUUsSUFBSTtJQUMxQixtQkFBbUIsRUFBRSxDQUFDLElBQTJCLEVBQUUsRUFBRTtRQUNuRCxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUM7WUFDM0MsYUFBYSxDQUNULElBQUksQ0FBQyxLQUFLLEVBQ1YsNkVBQTZFLENBQUMsQ0FBQztRQUN2RixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixTQUFTLG1CQUFtQjtJQUMxQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsU0FBUywrQkFBK0I7SUFDdEMsZUFBZSxLQUFLLG1CQUFtQixFQUFFLENBQUM7SUFDMUMsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1JFQUNUSVZFX05PREUsIFJlYWN0aXZlTm9kZX0gZnJvbSAnLi4vc2lnbmFscyc7XG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydEVxdWFsfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5cbmltcG9ydCB7bWFya1ZpZXdEaXJ0eX0gZnJvbSAnLi9pbnN0cnVjdGlvbnMvbWFya192aWV3X2RpcnR5JztcbmltcG9ydCB7TFZpZXcsIFJFQUNUSVZFX0hPU1RfQklORElOR19DT05TVU1FUiwgUkVBQ1RJVkVfVEVNUExBVEVfQ09OU1VNRVJ9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcblxubGV0IGN1cnJlbnRDb25zdW1lcjogUmVhY3RpdmVMVmlld0NvbnN1bWVyfG51bGwgPSBudWxsO1xuZXhwb3J0IGludGVyZmFjZSBSZWFjdGl2ZUxWaWV3Q29uc3VtZXIgZXh0ZW5kcyBSZWFjdGl2ZU5vZGUge1xuICBsVmlldzogTFZpZXd8bnVsbDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGVtcGxhdGUgY29uc3VtZXIgcG9pbnRpbmcgYXQgdGhlIHNwZWNpZmllZCBMVmlldy5cbiAqIFNvbWV0aW1lcywgYSBwcmV2aW91c2x5IGNyZWF0ZWQgY29uc3VtZXIgbWF5IGJlIHJldXNlZCwgaW4gb3JkZXIgdG8gc2F2ZSBvbiBhbGxvY2F0aW9ucy4gSW4gdGhhdFxuICogY2FzZSwgdGhlIExWaWV3IHdpbGwgYmUgdXBkYXRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlYWN0aXZlTFZpZXdDb25zdW1lcihcbiAgICBsVmlldzogTFZpZXcsIHNsb3Q6IHR5cGVvZiBSRUFDVElWRV9URU1QTEFURV9DT05TVU1FUnx0eXBlb2YgUkVBQ1RJVkVfSE9TVF9CSU5ESU5HX0NPTlNVTUVSKTpcbiAgICBSZWFjdGl2ZUxWaWV3Q29uc3VtZXIge1xuICByZXR1cm4gbFZpZXdbc2xvdF0gPz8gZ2V0T3JDcmVhdGVDdXJyZW50TFZpZXdDb25zdW1lcigpO1xufVxuXG4vKipcbiAqIEFzc2lnbnMgdGhlIGBjdXJyZW50VGVtcGxhdGVDb250ZXh0YCB0byBpdHMgTFZpZXcncyBgUkVBQ1RJVkVfQ09OU1VNRVJgIHNsb3QgaWYgdGhlcmUgYXJlIHRyYWNrZWRcbiAqIHByb2R1Y2Vycy5cbiAqXG4gKiBUaGUgcHJlc2VuY2Ugb2YgcHJvZHVjZXJzIG1lYW5zIHRoYXQgYSBzaWduYWwgd2FzIHJlYWQgd2hpbGUgdGhlIGNvbnN1bWVyIHdhcyB0aGUgYWN0aXZlXG4gKiBjb25zdW1lci5cbiAqXG4gKiBJZiBubyBwcm9kdWNlcnMgYXJlIHByZXNlbnQsIHdlIGRvIG5vdCBhc3NpZ24gdGhlIGN1cnJlbnQgdGVtcGxhdGUgY29udGV4dC4gVGhpcyBhbHNvIG1lYW5zIHdlXG4gKiBjYW4ganVzdCByZXVzZSB0aGUgdGVtcGxhdGUgY29udGV4dCBmb3IgdGhlIG5leHQgTFZpZXcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21taXRMVmlld0NvbnN1bWVySWZIYXNQcm9kdWNlcnMoXG4gICAgbFZpZXc6IExWaWV3LFxuICAgIHNsb3Q6IHR5cGVvZiBSRUFDVElWRV9URU1QTEFURV9DT05TVU1FUnx0eXBlb2YgUkVBQ1RJVkVfSE9TVF9CSU5ESU5HX0NPTlNVTUVSKTogdm9pZCB7XG4gIGNvbnN0IGNvbnN1bWVyID0gZ2V0T3JDcmVhdGVDdXJyZW50TFZpZXdDb25zdW1lcigpO1xuICBpZiAoIWNvbnN1bWVyLnByb2R1Y2VyTm9kZT8ubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbFZpZXdbc2xvdF0gPSBjdXJyZW50Q29uc3VtZXI7XG4gIGNvbnN1bWVyLmxWaWV3ID0gbFZpZXc7XG4gIGN1cnJlbnRDb25zdW1lciA9IGNyZWF0ZUxWaWV3Q29uc3VtZXIoKTtcbn1cblxuY29uc3QgUkVBQ1RJVkVfTFZJRVdfQ09OU1VNRVJfTk9ERTogUmVhY3RpdmVMVmlld0NvbnN1bWVyID0ge1xuICAuLi5SRUFDVElWRV9OT0RFLFxuICBjb25zdW1lcklzQWx3YXlzTGl2ZTogdHJ1ZSxcbiAgY29uc3VtZXJNYXJrZWREaXJ0eTogKG5vZGU6IFJlYWN0aXZlTFZpZXdDb25zdW1lcikgPT4ge1xuICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmXG4gICAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgICBub2RlLmxWaWV3LFxuICAgICAgICAgICAgJ1VwZGF0aW5nIGEgc2lnbmFsIGR1cmluZyB0ZW1wbGF0ZSBvciBob3N0IGJpbmRpbmcgZXhlY3V0aW9uIGlzIG5vdCBhbGxvd2VkLicpO1xuICAgIG1hcmtWaWV3RGlydHkobm9kZS5sVmlldyEpO1xuICB9LFxuICBsVmlldzogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUxWaWV3Q29uc3VtZXIoKTogUmVhY3RpdmVMVmlld0NvbnN1bWVyIHtcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUoUkVBQ1RJVkVfTFZJRVdfQ09OU1VNRVJfTk9ERSk7XG59XG5cbmZ1bmN0aW9uIGdldE9yQ3JlYXRlQ3VycmVudExWaWV3Q29uc3VtZXIoKSB7XG4gIGN1cnJlbnRDb25zdW1lciA/Pz0gY3JlYXRlTFZpZXdDb25zdW1lcigpO1xuICByZXR1cm4gY3VycmVudENvbnN1bWVyO1xufVxuIl19