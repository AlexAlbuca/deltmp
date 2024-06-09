/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../errors';
import { getComponentDef } from './definition';
import { getDeclarationComponentDef } from './instructions/element_validation';
import { TVIEW } from './interfaces/view';
import { INTERPOLATION_DELIMITER } from './util/misc_utils';
import { stringifyForError } from './util/stringify_utils';
/**
 * The max length of the string representation of a value in an error message
 */
const VALUE_STRING_LENGTH_LIMIT = 200;
/** Verifies that a given type is a Standalone Component. */
export function assertStandaloneComponentType(type) {
    assertComponentDef(type);
    const componentDef = getComponentDef(type);
    if (!componentDef.standalone) {
        throw new RuntimeError(907 /* RuntimeErrorCode.TYPE_IS_NOT_STANDALONE */, `The ${stringifyForError(type)} component is not marked as standalone, ` +
            `but Angular expects to have a standalone component here. ` +
            `Please make sure the ${stringifyForError(type)} component has ` +
            `the \`standalone: true\` flag in the decorator.`);
    }
}
/** Verifies whether a given type is a component */
export function assertComponentDef(type) {
    if (!getComponentDef(type)) {
        throw new RuntimeError(906 /* RuntimeErrorCode.MISSING_GENERATED_DEF */, `The ${stringifyForError(type)} is not an Angular component, ` +
            `make sure it has the \`@Component\` decorator.`);
    }
}
/** Called when there are multiple component selectors that match a given node */
export function throwMultipleComponentError(tNode, first, second) {
    throw new RuntimeError(-300 /* RuntimeErrorCode.MULTIPLE_COMPONENTS_MATCH */, `Multiple components match node with tagname ${tNode.value}: ` +
        `${stringifyForError(first)} and ` +
        `${stringifyForError(second)}`);
}
/** Throws an ExpressionChangedAfterChecked error if checkNoChanges mode is on. */
export function throwErrorIfNoChangesMode(creationMode, oldValue, currValue, propName, lView) {
    const hostComponentDef = getDeclarationComponentDef(lView);
    const componentClassName = hostComponentDef?.type?.name;
    const field = propName ? ` for '${propName}'` : '';
    let msg = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value${field}: '${formatValue(oldValue)}'. Current value: '${formatValue(currValue)}'.${componentClassName ? ` Expression location: ${componentClassName} component` : ''}`;
    if (creationMode) {
        msg +=
            ` It seems like the view has been created after its parent and its children have been dirty checked.` +
                ` Has it been created in a change detection hook?`;
    }
    throw new RuntimeError(-100 /* RuntimeErrorCode.EXPRESSION_CHANGED_AFTER_CHECKED */, msg);
}
function formatValue(value) {
    let strValue = String(value);
    // JSON.stringify will throw on circular references
    try {
        if (Array.isArray(value) || strValue === '[object Object]') {
            strValue = JSON.stringify(value);
        }
    }
    catch (error) {
    }
    return strValue.length > VALUE_STRING_LENGTH_LIMIT ?
        (strValue.substring(0, VALUE_STRING_LENGTH_LIMIT) + '…') :
        strValue;
}
function constructDetailsForInterpolation(lView, rootIndex, expressionIndex, meta, changedValue) {
    const [propName, prefix, ...chunks] = meta.split(INTERPOLATION_DELIMITER);
    let oldValue = prefix, newValue = prefix;
    for (let i = 0; i < chunks.length; i++) {
        const slotIdx = rootIndex + i;
        oldValue += `${lView[slotIdx]}${chunks[i]}`;
        newValue += `${slotIdx === expressionIndex ? changedValue : lView[slotIdx]}${chunks[i]}`;
    }
    return { propName, oldValue, newValue };
}
/**
 * Constructs an object that contains details for the ExpressionChangedAfterItHasBeenCheckedError:
 * - property name (for property bindings or interpolations)
 * - old and new values, enriched using information from metadata
 *
 * More information on the metadata storage format can be found in `storePropertyBindingMetadata`
 * function description.
 */
export function getExpressionChangedErrorDetails(lView, bindingIndex, oldValue, newValue) {
    const tData = lView[TVIEW].data;
    const metadata = tData[bindingIndex];
    if (typeof metadata === 'string') {
        // metadata for property interpolation
        if (metadata.indexOf(INTERPOLATION_DELIMITER) > -1) {
            return constructDetailsForInterpolation(lView, bindingIndex, bindingIndex, metadata, newValue);
        }
        // metadata for property binding
        return { propName: metadata, oldValue, newValue };
    }
    // metadata is not available for this expression, check if this expression is a part of the
    // property interpolation by going from the current binding index left and look for a string that
    // contains INTERPOLATION_DELIMITER, the layout in tView.data for this case will look like this:
    // [..., 'id�Prefix � and � suffix', null, null, null, ...]
    if (metadata === null) {
        let idx = bindingIndex - 1;
        while (typeof tData[idx] !== 'string' && tData[idx + 1] === null) {
            idx--;
        }
        const meta = tData[idx];
        if (typeof meta === 'string') {
            const matches = meta.match(new RegExp(INTERPOLATION_DELIMITER, 'g'));
            // first interpolation delimiter separates property name from interpolation parts (in case of
            // property interpolations), so we subtract one from total number of found delimiters
            if (matches && (matches.length - 1) > bindingIndex - idx) {
                return constructDetailsForInterpolation(lView, idx, bindingIndex, meta, newValue);
            }
        }
    }
    return { propName: undefined, oldValue, newValue };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxXQUFXLENBQUM7QUFHekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM3QyxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUU3RSxPQUFPLEVBQVEsS0FBSyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDMUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFekQ7O0dBRUc7QUFDSCxNQUFNLHlCQUF5QixHQUFHLEdBQUcsQ0FBQztBQUV0Qyw0REFBNEQ7QUFDNUQsTUFBTSxVQUFVLDZCQUE2QixDQUFDLElBQW1CO0lBQy9ELGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUUsQ0FBQztJQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRTtRQUM1QixNQUFNLElBQUksWUFBWSxvREFFbEIsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsMENBQTBDO1lBQ3BFLDJEQUEyRDtZQUMzRCx3QkFBd0IsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtZQUNoRSxpREFBaUQsQ0FBQyxDQUFDO0tBQzVEO0FBQ0gsQ0FBQztBQUVELG1EQUFtRDtBQUNuRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBbUI7SUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixNQUFNLElBQUksWUFBWSxtREFFbEIsT0FBTyxp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RSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLDZGQUE2RjtZQUM3RixxRkFBcUY7WUFDckYsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksR0FBRyxHQUFHLEVBQUU7Z0JBQ3hELE9BQU8sZ0NBQWdDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ25GO1NBQ0Y7S0FDRjtJQUNELE9BQU8sRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQztBQUNuRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZS90eXBlJztcblxuaW1wb3J0IHtnZXRDb21wb25lbnREZWZ9IGZyb20gJy4vZGVmaW5pdGlvbic7XG5pbXBvcnQge2dldERlY2xhcmF0aW9uQ29tcG9uZW50RGVmfSBmcm9tICcuL2luc3RydWN0aW9ucy9lbGVtZW50X3ZhbGlkYXRpb24nO1xuaW1wb3J0IHtUTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtMVmlldywgVFZJRVd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7SU5URVJQT0xBVElPTl9ERUxJTUlURVJ9IGZyb20gJy4vdXRpbC9taXNjX3V0aWxzJztcbmltcG9ydCB7c3RyaW5naWZ5Rm9yRXJyb3J9IGZyb20gJy4vdXRpbC9zdHJpbmdpZnlfdXRpbHMnO1xuXG4vKipcbiAqIFRoZSBtYXggbGVuZ3RoIG9mIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2YWx1ZSBpbiBhbiBlcnJvciBtZXNzYWdlXG4gKi9cbmNvbnN0IFZBTFVFX1NUUklOR19MRU5HVEhfTElNSVQgPSAyMDA7XG5cbi8qKiBWZXJpZmllcyB0aGF0IGEgZ2l2ZW4gdHlwZSBpcyBhIFN0YW5kYWxvbmUgQ29tcG9uZW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFN0YW5kYWxvbmVDb21wb25lbnRUeXBlKHR5cGU6IFR5cGU8dW5rbm93bj4pIHtcbiAgYXNzZXJ0Q29tcG9uZW50RGVmKHR5cGUpO1xuICBjb25zdCBjb21wb25lbnREZWYgPSBnZXRDb21wb25lbnREZWYodHlwZSkhO1xuICBpZiAoIWNvbXBvbmVudERlZi5zdGFuZGFsb25lKSB7XG4gICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgUnVudGltZUVycm9yQ29kZS5UWVBFX0lTX05PVF9TVEFOREFMT05FLFxuICAgICAgICBgVGhlICR7c3RyaW5naWZ5Rm9yRXJyb3IodHlwZSl9IGNvbXBvbmVudCBpcyBub3QgbWFya2VkIGFzIHN0YW5kYWxvbmUsIGAgK1xuICAgICAgICAgICAgYGJ1dCBBbmd1bGFyIGV4cGVjdHMgdG8gaGF2ZSBhIHN0YW5kYWxvbmUgY29tcG9uZW50IGhlcmUuIGAgK1xuICAgICAgICAgICAgYFBsZWFzZSBtYWtlIHN1cmUgdGhlICR7c3RyaW5naWZ5Rm9yRXJyb3IodHlwZSl9IGNvbXBvbmVudCBoYXMgYCArXG4gICAgICAgICAgICBgdGhlIFxcYHN0YW5kYWxvbmU6IHRydWVcXGAgZmxhZyBpbiB0aGUgZGVjb3JhdG9yLmApO1xuICB9XG59XG5cbi8qKiBWZXJpZmllcyB3aGV0aGVyIGEgZ2l2ZW4gdHlwZSBpcyBhIGNvbXBvbmVudCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydENvbXBvbmVudERlZih0eXBlOiBUeXBlPHVua25vd24+KSB7XG4gIGlmICghZ2V0Q29tcG9uZW50RGVmKHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgUnVudGltZUVycm9yQ29kZS5NSVNTSU5HX0dFTkVSQVRFRF9ERUYsXG4gICAgICAgIGBUaGUgJHtzdHJpbmdpZnlGb3JFcnJvcih0eXBlKX0gaXMgbm90IGFuIEFuZ3VsYXIgY29tcG9uZW50LCBgICtcbiAgICAgICAgICAgIGBtYWtlIHN1cmUgaXQgaGFzIHRoZSBcXGBAQ29tcG9uZW50XFxgIGRlY29yYXRvci5gKTtcbiAgfVxufVxuXG4vKiogQ2FsbGVkIHdoZW4gdGhlcmUgYXJlIG11bHRpcGxlIGNvbXBvbmVudCBzZWxlY3RvcnMgdGhhdCBtYXRjaCBhIGdpdmVuIG5vZGUgKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd011bHRpcGxlQ29tcG9uZW50RXJyb3IoXG4gICAgdE5vZGU6IFROb2RlLCBmaXJzdDogVHlwZTx1bmtub3duPiwgc2Vjb25kOiBUeXBlPHVua25vd24+KTogbmV2ZXIge1xuICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgUnVudGltZUVycm9yQ29kZS5NVUxUSVBMRV9DT01QT05FTlRTX01BVENILFxuICAgICAgYE11bHRpcGxlIGNvbXBvbmVudHMgbWF0Y2ggbm9kZSB3aXRoIHRhZ25hbWUgJHt0Tm9kZS52YWx1ZX06IGAgK1xuICAgICAgICAgIGAke3N0cmluZ2lmeUZvckVycm9yKGZpcnN0KX0gYW5kIGAgK1xuICAgICAgICAgIGAke3N0cmluZ2lmeUZvckVycm9yKHNlY29uZCl9YCk7XG59XG5cbi8qKiBUaHJvd3MgYW4gRXhwcmVzc2lvbkNoYW5nZWRBZnRlckNoZWNrZWQgZXJyb3IgaWYgY2hlY2tOb0NoYW5nZXMgbW9kZSBpcyBvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0Vycm9ySWZOb0NoYW5nZXNNb2RlKFxuICAgIGNyZWF0aW9uTW9kZTogYm9vbGVhbiwgb2xkVmFsdWU6IGFueSwgY3VyclZhbHVlOiBhbnksIHByb3BOYW1lOiBzdHJpbmd8dW5kZWZpbmVkLFxuICAgIGxWaWV3OiBMVmlldyk6IG5ldmVyIHtcbiAgY29uc3QgaG9zdENvbXBvbmVudERlZiA9IGdldERlY2xhcmF0aW9uQ29tcG9uZW50RGVmKGxWaWV3KTtcbiAgY29uc3QgY29tcG9uZW50Q2xhc3NOYW1lID0gaG9zdENvbXBvbmVudERlZj8udHlwZT8ubmFtZTtcbiAgY29uc3QgZmllbGQgPSBwcm9wTmFtZSA/IGAgZm9yICcke3Byb3BOYW1lfSdgIDogJyc7XG4gIGxldCBtc2cgPVxuICAgICAgYEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3I6IEV4cHJlc3Npb24gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWQuIFByZXZpb3VzIHZhbHVlJHtcbiAgICAgICAgICBmaWVsZH06ICcke2Zvcm1hdFZhbHVlKG9sZFZhbHVlKX0nLiBDdXJyZW50IHZhbHVlOiAnJHtmb3JtYXRWYWx1ZShjdXJyVmFsdWUpfScuJHtcbiAgICAgICAgICBjb21wb25lbnRDbGFzc05hbWUgPyBgIEV4cHJlc3Npb24gbG9jYXRpb246ICR7Y29tcG9uZW50Q2xhc3NOYW1lfSBjb21wb25lbnRgIDogJyd9YDtcbiAgaWYgKGNyZWF0aW9uTW9kZSkge1xuICAgIG1zZyArPVxuICAgICAgICBgIEl0IHNlZW1zIGxpa2UgdGhlIHZpZXcgaGFzIGJlZW4gY3JlYXRlZCBhZnRlciBpdHMgcGFyZW50IGFuZCBpdHMgY2hpbGRyZW4gaGF2ZSBiZWVuIGRpcnR5IGNoZWNrZWQuYCArXG4gICAgICAgIGAgSGFzIGl0IGJlZW4gY3JlYXRlZCBpbiBhIGNoYW5nZSBkZXRlY3Rpb24gaG9vaz9gO1xuICB9XG4gIHRocm93IG5ldyBSdW50aW1lRXJyb3IoUnVudGltZUVycm9yQ29kZS5FWFBSRVNTSU9OX0NIQU5HRURfQUZURVJfQ0hFQ0tFRCwgbXNnKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWU6IHVua25vd24pOiBzdHJpbmcge1xuICBsZXQgc3RyVmFsdWU6IHN0cmluZyA9IFN0cmluZyh2YWx1ZSk7XG5cbiAgLy8gSlNPTi5zdHJpbmdpZnkgd2lsbCB0aHJvdyBvbiBjaXJjdWxhciByZWZlcmVuY2VzXG4gIHRyeSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHN0clZhbHVlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgc3RyVmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICB9XG4gIHJldHVybiBzdHJWYWx1ZS5sZW5ndGggPiBWQUxVRV9TVFJJTkdfTEVOR1RIX0xJTUlUID9cbiAgICAgIChzdHJWYWx1ZS5zdWJzdHJpbmcoMCwgVkFMVUVfU1RSSU5HX0xFTkdUSF9MSU1JVCkgKyAn4oCmJykgOlxuICAgICAgc3RyVmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdERldGFpbHNGb3JJbnRlcnBvbGF0aW9uKFxuICAgIGxWaWV3OiBMVmlldywgcm9vdEluZGV4OiBudW1iZXIsIGV4cHJlc3Npb25JbmRleDogbnVtYmVyLCBtZXRhOiBzdHJpbmcsIGNoYW5nZWRWYWx1ZTogYW55KSB7XG4gIGNvbnN0IFtwcm9wTmFtZSwgcHJlZml4LCAuLi5jaHVua3NdID0gbWV0YS5zcGxpdChJTlRFUlBPTEFUSU9OX0RFTElNSVRFUik7XG4gIGxldCBvbGRWYWx1ZSA9IHByZWZpeCwgbmV3VmFsdWUgPSBwcmVmaXg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc2xvdElkeCA9IHJvb3RJbmRleCArIGk7XG4gICAgb2xkVmFsdWUgKz0gYCR7bFZpZXdbc2xvdElkeF19JHtjaHVua3NbaV19YDtcbiAgICBuZXdWYWx1ZSArPSBgJHtzbG90SWR4ID09PSBleHByZXNzaW9uSW5kZXggPyBjaGFuZ2VkVmFsdWUgOiBsVmlld1tzbG90SWR4XX0ke2NodW5rc1tpXX1gO1xuICB9XG4gIHJldHVybiB7cHJvcE5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZX07XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBkZXRhaWxzIGZvciB0aGUgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvcjpcbiAqIC0gcHJvcGVydHkgbmFtZSAoZm9yIHByb3BlcnR5IGJpbmRpbmdzIG9yIGludGVycG9sYXRpb25zKVxuICogLSBvbGQgYW5kIG5ldyB2YWx1ZXMsIGVucmljaGVkIHVzaW5nIGluZm9ybWF0aW9uIGZyb20gbWV0YWRhdGFcbiAqXG4gKiBNb3JlIGluZm9ybWF0aW9uIG9uIHRoZSBtZXRhZGF0YSBzdG9yYWdlIGZvcm1hdCBjYW4gYmUgZm91bmQgaW4gYHN0b3JlUHJvcGVydHlCaW5kaW5nTWV0YWRhdGFgXG4gKiBmdW5jdGlvbiBkZXNjcmlwdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEV4cHJlc3Npb25DaGFuZ2VkRXJyb3JEZXRhaWxzKFxuICAgIGxWaWV3OiBMVmlldywgYmluZGluZ0luZGV4OiBudW1iZXIsIG9sZFZhbHVlOiBhbnksXG4gICAgbmV3VmFsdWU6IGFueSk6IHtwcm9wTmFtZT86IHN0cmluZywgb2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueX0ge1xuICBjb25zdCB0RGF0YSA9IGxWaWV3W1RWSUVXXS5kYXRhO1xuICBjb25zdCBtZXRhZGF0YSA9IHREYXRhW2JpbmRpbmdJbmRleF07XG5cbiAgaWYgKHR5cGVvZiBtZXRhZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBtZXRhZGF0YSBmb3IgcHJvcGVydHkgaW50ZXJwb2xhdGlvblxuICAgIGlmIChtZXRhZGF0YS5pbmRleE9mKElOVEVSUE9MQVRJT05fREVMSU1JVEVSKSA+IC0xKSB7XG4gICAgICByZXR1cm4gY29uc3RydWN0RGV0YWlsc0ZvckludGVycG9sYXRpb24oXG4gICAgICAgICAgbFZpZXcsIGJpbmRpbmdJbmRleCwgYmluZGluZ0luZGV4LCBtZXRhZGF0YSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgICAvLyBtZXRhZGF0YSBmb3IgcHJvcGVydHkgYmluZGluZ1xuICAgIHJldHVybiB7cHJvcE5hbWU6IG1ldGFkYXRhLCBvbGRWYWx1ZSwgbmV3VmFsdWV9O1xuICB9XG5cbiAgLy8gbWV0YWRhdGEgaXMgbm90IGF2YWlsYWJsZSBmb3IgdGhpcyBleHByZXNzaW9uLCBjaGVjayBpZiB0aGlzIGV4cHJlc3Npb24gaXMgYSBwYXJ0IG9mIHRoZVxuICAvLyBwcm9wZXJ0eSBpbnRlcnBvbGF0aW9uIGJ5IGdvaW5nIGZyb20gdGhlIGN1cnJlbnQgYmluZGluZyBpbmRleCBsZWZ0IGFuZCBsb29rIGZvciBhIHN0cmluZyB0aGF0XG4gIC8vIGNvbnRhaW5zIElOVEVSUE9MQVRJT05fREVMSU1JVEVSLCB0aGUgbGF5b3V0IGluIHRWaWV3LmRhdGEgZm9yIHRoaXMgY2FzZSB3aWxsIGxvb2sgbGlrZSB0aGlzOlxuICAvLyBbLi4uLCAnaWTvv71QcmVmaXgg77+9IGFuZCDvv70gc3VmZml4JywgbnVsbCwgbnVsbCwgbnVsbCwgLi4uXVxuICBpZiAobWV0YWRhdGEgPT09IG51bGwpIHtcbiAgICBsZXQgaWR4ID0gYmluZGluZ0luZGV4IC0gMTtcbiAgICB3aGlsZSAodHlwZW9mIHREYXRhW2lkeF0gIT09ICdzdHJpbmcnICYmIHREYXRhW2lkeCArIDFdID09PSBudWxsKSB7XG4gICAgICBpZHgtLTtcbiAgICB9XG4gICAgY29uc3QgbWV0YSA9IHREYXRhW2lkeF07XG4gICAgaWYgKHR5cGVvZiBtZXRhID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IG1ldGEubWF0Y2gobmV3IFJlZ0V4cChJTlRFUlBPTEFUSU9OX0RFTElNSVRFUiwgJ2cnKSk7XG4gICAgICAvLyBmaXJzdCBpbnRlcnBvbGF0aW9uIGRlbGltaXRlciBzZXBhcmF0ZXMgcHJvcGVydHkgbmFtZSBmcm9tIGludGVycG9sYXRpb24gcGFydHMgKGluIGNhc2Ugb2ZcbiAgICAgIC8vIHByb3BlcnR5IGludGVycG9sYXRpb25zKSwgc28gd2Ugc3VidHJhY3Qgb25lIGZyb20gdG90YWwgbnVtYmVyIG9mIGZvdW5kIGRlbGltaXRlcnNcbiAgICAgIGlmIChtYXRjaGVzICYmIChtYXRjaGVzLmxlbmd0aCAtIDEpID4gYmluZGluZ0luZGV4IC0gaWR4KSB7XG4gICAgICAgIHJldHVybiBjb25zdHJ1Y3REZXRhaWxzRm9ySW50ZXJwb2xhdGlvbihsVmlldywgaWR4LCBiaW5kaW5nSW5kZXgsIG1ldGEsIG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtwcm9wTmFtZTogdW5kZWZpbmVkLCBvbGRWYWx1ZSwgbmV3VmFsdWV9O1xufVxuIl19