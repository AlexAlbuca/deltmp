/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ir from '../../ir';
const STYLE_DOT = 'style.';
const CLASS_DOT = 'class.';
export function phaseHostStylePropertyParsing(job) {
    for (const op of job.update) {
        if (op.kind !== ir.OpKind.Binding) {
            continue;
        }
        if (op.name.startsWith(STYLE_DOT)) {
            op.bindingKind = ir.BindingKind.StyleProperty;
            op.name = op.name.substring(STYLE_DOT.length);
            if (isCssCustomProperty(op.name)) {
                op.name = hyphenate(op.name);
            }
            const { property, suffix } = parseProperty(op.name);
            op.name = property;
            op.unit = suffix;
        }
        else if (op.name.startsWith('style!')) {
            // TODO: do we only transform !important?
            op.name = 'style';
        }
        else if (op.name.startsWith(CLASS_DOT)) {
            op.bindingKind = ir.BindingKind.ClassName;
            op.name = parseProperty(op.name.substring(CLASS_DOT.length)).property;
        }
    }
}
/**
 * Checks whether property name is a custom CSS property.
 * See: https://www.w3.org/TR/css-variables-1
 */
function isCssCustomProperty(name) {
    return name.startsWith('--');
}
function hyphenate(value) {
    return value
        .replace(/[a-z][A-Z]/g, v => {
        return v.charAt(0) + '-' + v.charAt(1);
    })
        .toLowerCase();
}
function parseProperty(name) {
    const overrideIndex = name.indexOf('!important');
    if (overrideIndex !== -1) {
        name = overrideIndex > 0 ? name.substring(0, overrideIndex) : '';
    }
    let suffix = null;
    let property = name;
    const unitIndex = name.lastIndexOf('.');
    if (unitIndex > 0) {
        suffix = name.slice(unitIndex + 1);
        property = name.substring(0, unitIndex);
    }
    return { property, suffix };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdF9zdHlsZV9wcm9wZXJ0eV9wYXJzaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3RlbXBsYXRlL3BpcGVsaW5lL3NyYy9waGFzZXMvaG9zdF9zdHlsZV9wcm9wZXJ0eV9wYXJzaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBSS9CLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUMzQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFFM0IsTUFBTSxVQUFVLDZCQUE2QixDQUFDLEdBQThCO0lBQzFFLEtBQUssTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUMzQixJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDakMsU0FBUztTQUNWO1FBRUQsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqQyxFQUFFLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlDLElBQUksbUJBQW1CLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQyxFQUFFLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUI7WUFFRCxNQUFNLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7WUFDbkIsRUFBRSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7U0FDbEI7YUFBTSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3ZDLHlDQUF5QztZQUN6QyxFQUFFLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUNuQjthQUFNLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDeEMsRUFBRSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUMxQyxFQUFFLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDdkU7S0FDRjtBQUNILENBQUM7QUFHRDs7O0dBR0c7QUFDSCxTQUFTLG1CQUFtQixDQUFDLElBQVk7SUFDdkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxLQUFhO0lBQzlCLE9BQU8sS0FBSztTQUNQLE9BQU8sQ0FDSixhQUFhLEVBQ2IsQ0FBQyxDQUFDLEVBQUU7UUFDRixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDO1NBQ0wsV0FBVyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLElBQVk7SUFDakMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxJQUFJLGFBQWEsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN4QixJQUFJLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNsRTtJQUVELElBQUksTUFBTSxHQUFnQixJQUFJLENBQUM7SUFDL0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1FBQ2pCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDekM7SUFFRCxPQUFPLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDO0FBQzVCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgbyBmcm9tICcuLi8uLi8uLi8uLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQgKiBhcyBpciBmcm9tICcuLi8uLi9pcic7XG5cbmltcG9ydCB0eXBlIHtIb3N0QmluZGluZ0NvbXBpbGF0aW9uSm9ifSBmcm9tICcuLi9jb21waWxhdGlvbic7XG5cbmNvbnN0IFNUWUxFX0RPVCA9ICdzdHlsZS4nO1xuY29uc3QgQ0xBU1NfRE9UID0gJ2NsYXNzLic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwaGFzZUhvc3RTdHlsZVByb3BlcnR5UGFyc2luZyhqb2I6IEhvc3RCaW5kaW5nQ29tcGlsYXRpb25Kb2IpOiB2b2lkIHtcbiAgZm9yIChjb25zdCBvcCBvZiBqb2IudXBkYXRlKSB7XG4gICAgaWYgKG9wLmtpbmQgIT09IGlyLk9wS2luZC5CaW5kaW5nKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAob3AubmFtZS5zdGFydHNXaXRoKFNUWUxFX0RPVCkpIHtcbiAgICAgIG9wLmJpbmRpbmdLaW5kID0gaXIuQmluZGluZ0tpbmQuU3R5bGVQcm9wZXJ0eTtcbiAgICAgIG9wLm5hbWUgPSBvcC5uYW1lLnN1YnN0cmluZyhTVFlMRV9ET1QubGVuZ3RoKTtcblxuICAgICAgaWYgKGlzQ3NzQ3VzdG9tUHJvcGVydHkob3AubmFtZSkpIHtcbiAgICAgICAgb3AubmFtZSA9IGh5cGhlbmF0ZShvcC5uYW1lKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qge3Byb3BlcnR5LCBzdWZmaXh9ID0gcGFyc2VQcm9wZXJ0eShvcC5uYW1lKTtcbiAgICAgIG9wLm5hbWUgPSBwcm9wZXJ0eTtcbiAgICAgIG9wLnVuaXQgPSBzdWZmaXg7XG4gICAgfSBlbHNlIGlmIChvcC5uYW1lLnN0YXJ0c1dpdGgoJ3N0eWxlIScpKSB7XG4gICAgICAvLyBUT0RPOiBkbyB3ZSBvbmx5IHRyYW5zZm9ybSAhaW1wb3J0YW50P1xuICAgICAgb3AubmFtZSA9ICdzdHlsZSc7XG4gICAgfSBlbHNlIGlmIChvcC5uYW1lLnN0YXJ0c1dpdGgoQ0xBU1NfRE9UKSkge1xuICAgICAgb3AuYmluZGluZ0tpbmQgPSBpci5CaW5kaW5nS2luZC5DbGFzc05hbWU7XG4gICAgICBvcC5uYW1lID0gcGFyc2VQcm9wZXJ0eShvcC5uYW1lLnN1YnN0cmluZyhDTEFTU19ET1QubGVuZ3RoKSkucHJvcGVydHk7XG4gICAgfVxuICB9XG59XG5cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBwcm9wZXJ0eSBuYW1lIGlzIGEgY3VzdG9tIENTUyBwcm9wZXJ0eS5cbiAqIFNlZTogaHR0cHM6Ly93d3cudzMub3JnL1RSL2Nzcy12YXJpYWJsZXMtMVxuICovXG5mdW5jdGlvbiBpc0Nzc0N1c3RvbVByb3BlcnR5KG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbmFtZS5zdGFydHNXaXRoKCctLScpO1xufVxuXG5mdW5jdGlvbiBoeXBoZW5hdGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZVxuICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgL1thLXpdW0EtWl0vZyxcbiAgICAgICAgICB2ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2LmNoYXJBdCgwKSArICctJyArIHYuY2hhckF0KDEpO1xuICAgICAgICAgIH0pXG4gICAgICAudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VQcm9wZXJ0eShuYW1lOiBzdHJpbmcpOiB7cHJvcGVydHk6IHN0cmluZywgc3VmZml4OiBzdHJpbmd8bnVsbH0ge1xuICBjb25zdCBvdmVycmlkZUluZGV4ID0gbmFtZS5pbmRleE9mKCchaW1wb3J0YW50Jyk7XG4gIGlmIChvdmVycmlkZUluZGV4ICE9PSAtMSkge1xuICAgIG5hbWUgPSBvdmVycmlkZUluZGV4ID4gMCA/IG5hbWUuc3Vic3RyaW5nKDAsIG92ZXJyaWRlSW5kZXgpIDogJyc7XG4gIH1cblxuICBsZXQgc3VmZml4OiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gIGxldCBwcm9wZXJ0eSA9IG5hbWU7XG4gIGNvbnN0IHVuaXRJbmRleCA9IG5hbWUubGFzdEluZGV4T2YoJy4nKTtcbiAgaWYgKHVuaXRJbmRleCA+IDApIHtcbiAgICBzdWZmaXggPSBuYW1lLnNsaWNlKHVuaXRJbmRleCArIDEpO1xuICAgIHByb3BlcnR5ID0gbmFtZS5zdWJzdHJpbmcoMCwgdW5pdEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7cHJvcGVydHksIHN1ZmZpeH07XG59XG4iXX0=