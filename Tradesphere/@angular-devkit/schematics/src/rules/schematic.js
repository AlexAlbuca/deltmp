"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.schematic = exports.externalSchematic = void 0;
const rxjs_1 = require("rxjs");
const interface_1 = require("../tree/interface");
const static_1 = require("../tree/static");
/**
 * Run a schematic from a separate collection.
 *
 * @param collectionName The name of the collection that contains the schematic to run.
 * @param schematicName The name of the schematic to run.
 * @param options The options to pass as input to the RuleFactory.
 */
function externalSchematic(collectionName, schematicName, options, executionOptions) {
    return (input, context) => {
        const collection = context.engine.createCollection(collectionName, context.schematic.collection);
        const schematic = collection.createSchematic(schematicName);
        return schematic.call(options, (0, rxjs_1.of)((0, static_1.branch)(input)), context, executionOptions).pipe((0, rxjs_1.last)(), (0, rxjs_1.map)((x) => {
            input.merge(x, interface_1.MergeStrategy.AllowOverwriteConflict);
            return input;
        }));
    };
}
exports.externalSchematic = externalSchematic;
/**
 * Run a schematic from the same collection.
 *
 * @param schematicName The name of the schematic to run.
 * @param options The options to pass as input to the RuleFactory.
 */
function schematic(schematicName, options, executionOptions) {
    return (input, context) => {
        const collection = context.schematic.collection;
        const schematic = collection.createSchematic(schematicName, true);
        return schematic.call(options, (0, rxjs_1.of)((0, static_1.branch)(input)), context, executionOptions).pipe((0, rxjs_1.last)(), (0, rxjs_1.map)((x) => {
            // We allow overwrite conflict here because they're the only merge conflict we particularly
            // don't want to deal with; the input tree might have an OVERWRITE which the sub
            input.merge(x, interface_1.MergeStrategy.AllowOverwriteConflict);
            return input;
        }));
    };
}
exports.schematic = schematic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvcnVsZXMvc2NoZW1hdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILCtCQUFxRDtBQUVyRCxpREFBd0Q7QUFDeEQsMkNBQXdDO0FBRXhDOzs7Ozs7R0FNRztBQUNILFNBQWdCLGlCQUFpQixDQUMvQixjQUFzQixFQUN0QixhQUFxQixFQUNyQixPQUFnQixFQUNoQixnQkFBNEM7SUFFNUMsT0FBTyxDQUFDLEtBQVcsRUFBRSxPQUF5QixFQUFFLEVBQUU7UUFDaEQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDaEQsY0FBYyxFQUNkLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUM3QixDQUFDO1FBQ0YsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUEsU0FBWSxFQUFDLElBQUEsZUFBTSxFQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUN6RixJQUFBLFdBQUksR0FBRSxFQUNOLElBQUEsVUFBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDUixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSx5QkFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFckQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXRCRCw4Q0FzQkM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLFNBQVMsQ0FDdkIsYUFBcUIsRUFDckIsT0FBZ0IsRUFDaEIsZ0JBQTRDO0lBRTVDLE9BQU8sQ0FBQyxLQUFXLEVBQUUsT0FBeUIsRUFBRSxFQUFFO1FBQ2hELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQ2hELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWxFLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBQSxTQUFZLEVBQUMsSUFBQSxlQUFNLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQ3pGLElBQUEsV0FBSSxHQUFFLEVBQ04sSUFBQSxVQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNSLDJGQUEyRjtZQUMzRixnRkFBZ0Y7WUFDaEYsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUseUJBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRXJELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUM7QUFwQkQsOEJBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IGxhc3QsIG1hcCwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBFeGVjdXRpb25PcHRpb25zLCBSdWxlLCBTY2hlbWF0aWNDb250ZXh0IH0gZnJvbSAnLi4vZW5naW5lL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBNZXJnZVN0cmF0ZWd5LCBUcmVlIH0gZnJvbSAnLi4vdHJlZS9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgYnJhbmNoIH0gZnJvbSAnLi4vdHJlZS9zdGF0aWMnO1xuXG4vKipcbiAqIFJ1biBhIHNjaGVtYXRpYyBmcm9tIGEgc2VwYXJhdGUgY29sbGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0gY29sbGVjdGlvbk5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvbGxlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgc2NoZW1hdGljIHRvIHJ1bi5cbiAqIEBwYXJhbSBzY2hlbWF0aWNOYW1lIFRoZSBuYW1lIG9mIHRoZSBzY2hlbWF0aWMgdG8gcnVuLlxuICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gcGFzcyBhcyBpbnB1dCB0byB0aGUgUnVsZUZhY3RvcnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRlcm5hbFNjaGVtYXRpYzxPcHRpb25UIGV4dGVuZHMgb2JqZWN0PihcbiAgY29sbGVjdGlvbk5hbWU6IHN0cmluZyxcbiAgc2NoZW1hdGljTmFtZTogc3RyaW5nLFxuICBvcHRpb25zOiBPcHRpb25ULFxuICBleGVjdXRpb25PcHRpb25zPzogUGFydGlhbDxFeGVjdXRpb25PcHRpb25zPixcbik6IFJ1bGUge1xuICByZXR1cm4gKGlucHV0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IGNvbnRleHQuZW5naW5lLmNyZWF0ZUNvbGxlY3Rpb24oXG4gICAgICBjb2xsZWN0aW9uTmFtZSxcbiAgICAgIGNvbnRleHQuc2NoZW1hdGljLmNvbGxlY3Rpb24sXG4gICAgKTtcbiAgICBjb25zdCBzY2hlbWF0aWMgPSBjb2xsZWN0aW9uLmNyZWF0ZVNjaGVtYXRpYyhzY2hlbWF0aWNOYW1lKTtcblxuICAgIHJldHVybiBzY2hlbWF0aWMuY2FsbChvcHRpb25zLCBvYnNlcnZhYmxlT2YoYnJhbmNoKGlucHV0KSksIGNvbnRleHQsIGV4ZWN1dGlvbk9wdGlvbnMpLnBpcGUoXG4gICAgICBsYXN0KCksXG4gICAgICBtYXAoKHgpID0+IHtcbiAgICAgICAgaW5wdXQubWVyZ2UoeCwgTWVyZ2VTdHJhdGVneS5BbGxvd092ZXJ3cml0ZUNvbmZsaWN0KTtcblxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xufVxuXG4vKipcbiAqIFJ1biBhIHNjaGVtYXRpYyBmcm9tIHRoZSBzYW1lIGNvbGxlY3Rpb24uXG4gKlxuICogQHBhcmFtIHNjaGVtYXRpY05hbWUgVGhlIG5hbWUgb2YgdGhlIHNjaGVtYXRpYyB0byBydW4uXG4gKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyB0byBwYXNzIGFzIGlucHV0IHRvIHRoZSBSdWxlRmFjdG9yeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVtYXRpYzxPcHRpb25UIGV4dGVuZHMgb2JqZWN0PihcbiAgc2NoZW1hdGljTmFtZTogc3RyaW5nLFxuICBvcHRpb25zOiBPcHRpb25ULFxuICBleGVjdXRpb25PcHRpb25zPzogUGFydGlhbDxFeGVjdXRpb25PcHRpb25zPixcbik6IFJ1bGUge1xuICByZXR1cm4gKGlucHV0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IGNvbnRleHQuc2NoZW1hdGljLmNvbGxlY3Rpb247XG4gICAgY29uc3Qgc2NoZW1hdGljID0gY29sbGVjdGlvbi5jcmVhdGVTY2hlbWF0aWMoc2NoZW1hdGljTmFtZSwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gc2NoZW1hdGljLmNhbGwob3B0aW9ucywgb2JzZXJ2YWJsZU9mKGJyYW5jaChpbnB1dCkpLCBjb250ZXh0LCBleGVjdXRpb25PcHRpb25zKS5waXBlKFxuICAgICAgbGFzdCgpLFxuICAgICAgbWFwKCh4KSA9PiB7XG4gICAgICAgIC8vIFdlIGFsbG93IG92ZXJ3cml0ZSBjb25mbGljdCBoZXJlIGJlY2F1c2UgdGhleSdyZSB0aGUgb25seSBtZXJnZSBjb25mbGljdCB3ZSBwYXJ0aWN1bGFybHlcbiAgICAgICAgLy8gZG9uJ3Qgd2FudCB0byBkZWFsIHdpdGg7IHRoZSBpbnB1dCB0cmVlIG1pZ2h0IGhhdmUgYW4gT1ZFUldSSVRFIHdoaWNoIHRoZSBzdWJcbiAgICAgICAgaW5wdXQubWVyZ2UoeCwgTWVyZ2VTdHJhdGVneS5BbGxvd092ZXJ3cml0ZUNvbmZsaWN0KTtcblxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xufVxuIl19