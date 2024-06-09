/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { APP_ID, CSP_NONCE, Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import * as i0 from "@angular/core";
/** The style elements attribute name used to set value of `APP_ID` token. */
const APP_ID_ATTRIBUTE_NAME = 'ng-app-id';
export class SharedStylesHost {
    constructor(doc, appId, nonce, platformId = {}) {
        this.doc = doc;
        this.appId = appId;
        this.nonce = nonce;
        this.platformId = platformId;
        // Maps all registered host nodes to a list of style nodes that have been added to the host node.
        this.styleRef = new Map();
        this.hostNodes = new Set();
        this.styleNodesInDOM = this.collectServerRenderedStyles();
        this.platformIsServer = isPlatformServer(platformId);
        this.resetHostNodes();
    }
    addStyles(styles) {
        for (const style of styles) {
            const usageCount = this.changeUsageCount(style, 1);
            if (usageCount === 1) {
                this.onStyleAdded(style);
            }
        }
    }
    removeStyles(styles) {
        for (const style of styles) {
            const usageCount = this.changeUsageCount(style, -1);
            if (usageCount <= 0) {
                this.onStyleRemoved(style);
            }
        }
    }
    ngOnDestroy() {
        const styleNodesInDOM = this.styleNodesInDOM;
        if (styleNodesInDOM) {
            styleNodesInDOM.forEach((node) => node.remove());
            styleNodesInDOM.clear();
        }
        for (const style of this.getAllStyles()) {
            this.onStyleRemoved(style);
        }
        this.resetHostNodes();
    }
    addHost(hostNode) {
        this.hostNodes.add(hostNode);
        for (const style of this.getAllStyles()) {
            this.addStyleToHost(hostNode, style);
        }
    }
    removeHost(hostNode) {
        this.hostNodes.delete(hostNode);
    }
    getAllStyles() {
        return this.styleRef.keys();
    }
    onStyleAdded(style) {
        for (const host of this.hostNodes) {
            this.addStyleToHost(host, style);
        }
    }
    onStyleRemoved(style) {
        const styleRef = this.styleRef;
        styleRef.get(style)?.elements?.forEach((node) => node.remove());
        styleRef.delete(style);
    }
    collectServerRenderedStyles() {
        const styles = this.doc.head?.querySelectorAll(`style[${APP_ID_ATTRIBUTE_NAME}="${this.appId}"]`);
        if (styles?.length) {
            const styleMap = new Map();
            styles.forEach((style) => {
                if (style.textContent != null) {
                    styleMap.set(style.textContent, style);
                }
            });
            return styleMap;
        }
        return null;
    }
    changeUsageCount(style, delta) {
        const map = this.styleRef;
        if (map.has(style)) {
            const styleRefValue = map.get(style);
            styleRefValue.usage += delta;
            return styleRefValue.usage;
        }
        map.set(style, { usage: delta, elements: [] });
        return delta;
    }
    getStyleElement(host, style) {
        const styleNodesInDOM = this.styleNodesInDOM;
        const styleEl = styleNodesInDOM?.get(style);
        if (styleEl?.parentNode === host) {
            // `styleNodesInDOM` cannot be undefined due to the above `styleNodesInDOM?.get`.
            styleNodesInDOM.delete(style);
            styleEl.removeAttribute(APP_ID_ATTRIBUTE_NAME);
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                // This attribute is solely used for debugging purposes.
                styleEl.setAttribute('ng-style-reused', '');
            }
            return styleEl;
        }
        else {
            const styleEl = this.doc.createElement('style');
            if (this.nonce) {
                styleEl.setAttribute('nonce', this.nonce);
            }
            styleEl.textContent = style;
            if (this.platformIsServer) {
                styleEl.setAttribute(APP_ID_ATTRIBUTE_NAME, this.appId);
            }
            return styleEl;
        }
    }
    addStyleToHost(host, style) {
        const styleEl = this.getStyleElement(host, style);
        host.appendChild(styleEl);
        const styleRef = this.styleRef;
        const styleElRef = styleRef.get(style)?.elements;
        if (styleElRef) {
            styleElRef.push(styleEl);
        }
        else {
            styleRef.set(style, { elements: [styleEl], usage: 1 });
        }
    }
    resetHostNodes() {
        const hostNodes = this.hostNodes;
        hostNodes.clear();
        // Re-add the head element back since this is the default host.
        hostNodes.add(this.doc.head);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }, { token: CSP_NONCE, optional: true }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SharedStylesHost }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SharedStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CSP_NONCE]
                }, {
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV0Ryw2RUFBNkU7QUFDN0UsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUM7QUFHMUMsTUFBTSxPQUFPLGdCQUFnQjtJQVczQixZQUN1QyxHQUFhLEVBQ2YsS0FBYSxFQUNQLEtBQW1CLEVBQzVCLGFBQXFCLEVBQUU7UUFIbEIsUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDUCxVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQWE7UUFkekQsaUdBQWlHO1FBQ2hGLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFJL0IsQ0FBQztRQUNZLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1FBUzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWdCO1FBQ3hCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFL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O2tCQUQ1QixVQUFVOzswQkFhSixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsTUFBTTs7MEJBQ2IsTUFBTTsyQkFBQyxTQUFTOzswQkFBRyxRQUFROzswQkFDM0IsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1TZXJ2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgQ1NQX05PTkNFLCBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIFRoZSBzdHlsZSBlbGVtZW50cyBhdHRyaWJ1dGUgbmFtZSB1c2VkIHRvIHNldCB2YWx1ZSBvZiBgQVBQX0lEYCB0b2tlbi4gKi9cbmNvbnN0IEFQUF9JRF9BVFRSSUJVVEVfTkFNRSA9ICduZy1hcHAtaWQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU3R5bGVzSG9zdCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8vIE1hcHMgYWxsIHJlZ2lzdGVyZWQgaG9zdCBub2RlcyB0byBhIGxpc3Qgb2Ygc3R5bGUgbm9kZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGhvc3Qgbm9kZS5cbiAgcHJpdmF0ZSByZWFkb25seSBzdHlsZVJlZiA9IG5ldyBNYXAgPCBzdHJpbmcgLyoqIFN0eWxlIHN0cmluZyAqLywge1xuICAgIGVsZW1lbnRzOiBIVE1MU3R5bGVFbGVtZW50W107XG4gICAgdXNhZ2U6IG51bWJlclxuICB9XG4gID4gKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaG9zdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IHN0eWxlTm9kZXNJbkRPTTogTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD58bnVsbDtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSByZWFkb25seSBkb2M6IERvY3VtZW50LFxuICAgICAgQEluamVjdChBUFBfSUQpIHByaXZhdGUgcmVhZG9ubHkgYXBwSWQ6IHN0cmluZyxcbiAgICAgIEBJbmplY3QoQ1NQX05PTkNFKSBAT3B0aW9uYWwoKSBwcml2YXRlIG5vbmNlPzogc3RyaW5nfG51bGwsXG4gICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSByZWFkb25seSBwbGF0Zm9ybUlkOiBvYmplY3QgPSB7fSkge1xuICAgIHRoaXMuc3R5bGVOb2Rlc0luRE9NID0gdGhpcy5jb2xsZWN0U2VydmVyUmVuZGVyZWRTdHlsZXMoKTtcbiAgICB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIgPSBpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpO1xuICAgIHRoaXMucmVzZXRIb3N0Tm9kZXMoKTtcbiAgfVxuXG4gIGFkZFN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHVzYWdlQ291bnQgPSB0aGlzLmNoYW5nZVVzYWdlQ291bnQoc3R5bGUsIDEpO1xuXG4gICAgICBpZiAodXNhZ2VDb3VudCA9PT0gMSkge1xuICAgICAgICB0aGlzLm9uU3R5bGVBZGRlZChzdHlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU3R5bGVzKHN0eWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHN0eWxlcykge1xuICAgICAgY29uc3QgdXNhZ2VDb3VudCA9IHRoaXMuY2hhbmdlVXNhZ2VDb3VudChzdHlsZSwgLTEpO1xuXG4gICAgICBpZiAodXNhZ2VDb3VudCA8PSAwKSB7XG4gICAgICAgIHRoaXMub25TdHlsZVJlbW92ZWQoc3R5bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlTm9kZXNJbkRPTSA9IHRoaXMuc3R5bGVOb2Rlc0luRE9NO1xuICAgIGlmIChzdHlsZU5vZGVzSW5ET00pIHtcbiAgICAgIHN0eWxlTm9kZXNJbkRPTS5mb3JFYWNoKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICAgIHN0eWxlTm9kZXNJbkRPTS5jbGVhcigpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc3R5bGUgb2YgdGhpcy5nZXRBbGxTdHlsZXMoKSkge1xuICAgICAgdGhpcy5vblN0eWxlUmVtb3ZlZChzdHlsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldEhvc3ROb2RlcygpO1xuICB9XG5cbiAgYWRkSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuaG9zdE5vZGVzLmFkZChob3N0Tm9kZSk7XG5cbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHRoaXMuZ2V0QWxsU3R5bGVzKCkpIHtcbiAgICAgIHRoaXMuYWRkU3R5bGVUb0hvc3QoaG9zdE5vZGUsIHN0eWxlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5ob3N0Tm9kZXMuZGVsZXRlKGhvc3ROb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuc3R5bGVSZWYua2V5cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0eWxlQWRkZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaG9zdCBvZiB0aGlzLmhvc3ROb2Rlcykge1xuICAgICAgdGhpcy5hZGRTdHlsZVRvSG9zdChob3N0LCBzdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblN0eWxlUmVtb3ZlZChzdHlsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVSZWYgPSB0aGlzLnN0eWxlUmVmO1xuICAgIHN0eWxlUmVmLmdldChzdHlsZSk/LmVsZW1lbnRzPy5mb3JFYWNoKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICBzdHlsZVJlZi5kZWxldGUoc3R5bGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb2xsZWN0U2VydmVyUmVuZGVyZWRTdHlsZXMoKTogTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD58bnVsbCB7XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5kb2MuaGVhZD8ucXVlcnlTZWxlY3RvckFsbDxIVE1MU3R5bGVFbGVtZW50PihcbiAgICAgICAgYHN0eWxlWyR7QVBQX0lEX0FUVFJJQlVURV9OQU1FfT1cIiR7dGhpcy5hcHBJZH1cIl1gKTtcblxuICAgIGlmIChzdHlsZXM/Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3R5bGVNYXAgPSBuZXcgTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD4oKTtcblxuICAgICAgc3R5bGVzLmZvckVhY2goKHN0eWxlKSA9PiB7XG4gICAgICAgIGlmIChzdHlsZS50ZXh0Q29udGVudCAhPSBudWxsKSB7XG4gICAgICAgICAgc3R5bGVNYXAuc2V0KHN0eWxlLnRleHRDb250ZW50LCBzdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc3R5bGVNYXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVVzYWdlQ291bnQoc3R5bGU6IHN0cmluZywgZGVsdGE6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5zdHlsZVJlZjtcbiAgICBpZiAobWFwLmhhcyhzdHlsZSkpIHtcbiAgICAgIGNvbnN0IHN0eWxlUmVmVmFsdWUgPSBtYXAuZ2V0KHN0eWxlKSE7XG4gICAgICBzdHlsZVJlZlZhbHVlLnVzYWdlICs9IGRlbHRhO1xuXG4gICAgICByZXR1cm4gc3R5bGVSZWZWYWx1ZS51c2FnZTtcbiAgICB9XG5cbiAgICBtYXAuc2V0KHN0eWxlLCB7dXNhZ2U6IGRlbHRhLCBlbGVtZW50czogW119KTtcbiAgICByZXR1cm4gZGVsdGE7XG4gIH1cblxuICBwcml2YXRlIGdldFN0eWxlRWxlbWVudChob3N0OiBOb2RlLCBzdHlsZTogc3RyaW5nKTogSFRNTFN0eWxlRWxlbWVudCB7XG4gICAgY29uc3Qgc3R5bGVOb2Rlc0luRE9NID0gdGhpcy5zdHlsZU5vZGVzSW5ET007XG4gICAgY29uc3Qgc3R5bGVFbCA9IHN0eWxlTm9kZXNJbkRPTT8uZ2V0KHN0eWxlKTtcbiAgICBpZiAoc3R5bGVFbD8ucGFyZW50Tm9kZSA9PT0gaG9zdCkge1xuICAgICAgLy8gYHN0eWxlTm9kZXNJbkRPTWAgY2Fubm90IGJlIHVuZGVmaW5lZCBkdWUgdG8gdGhlIGFib3ZlIGBzdHlsZU5vZGVzSW5ET00/LmdldGAuXG4gICAgICBzdHlsZU5vZGVzSW5ET00hLmRlbGV0ZShzdHlsZSk7XG5cbiAgICAgIHN0eWxlRWwucmVtb3ZlQXR0cmlidXRlKEFQUF9JRF9BVFRSSUJVVEVfTkFNRSk7XG5cbiAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgICAgLy8gVGhpcyBhdHRyaWJ1dGUgaXMgc29sZWx5IHVzZWQgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cbiAgICAgICAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoJ25nLXN0eWxlLXJldXNlZCcsICcnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlRWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBpZiAodGhpcy5ub25jZSkge1xuICAgICAgICBzdHlsZUVsLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCB0aGlzLm5vbmNlKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuXG4gICAgICBpZiAodGhpcy5wbGF0Zm9ybUlzU2VydmVyKSB7XG4gICAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKEFQUF9JRF9BVFRSSUJVVEVfTkFNRSwgdGhpcy5hcHBJZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZUVsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkU3R5bGVUb0hvc3QoaG9zdDogTm9kZSwgc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLmdldFN0eWxlRWxlbWVudChob3N0LCBzdHlsZSk7XG5cbiAgICBob3N0LmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuXG4gICAgY29uc3Qgc3R5bGVSZWYgPSB0aGlzLnN0eWxlUmVmO1xuICAgIGNvbnN0IHN0eWxlRWxSZWYgPSBzdHlsZVJlZi5nZXQoc3R5bGUpPy5lbGVtZW50cztcbiAgICBpZiAoc3R5bGVFbFJlZikge1xuICAgICAgc3R5bGVFbFJlZi5wdXNoKHN0eWxlRWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZVJlZi5zZXQoc3R5bGUsIHtlbGVtZW50czogW3N0eWxlRWxdLCB1c2FnZTogMX0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRIb3N0Tm9kZXMoKTogdm9pZCB7XG4gICAgY29uc3QgaG9zdE5vZGVzID0gdGhpcy5ob3N0Tm9kZXM7XG4gICAgaG9zdE5vZGVzLmNsZWFyKCk7XG4gICAgLy8gUmUtYWRkIHRoZSBoZWFkIGVsZW1lbnQgYmFjayBzaW5jZSB0aGlzIGlzIHRoZSBkZWZhdWx0IGhvc3QuXG4gICAgaG9zdE5vZGVzLmFkZCh0aGlzLmRvYy5oZWFkKTtcbiAgfVxufVxuIl19