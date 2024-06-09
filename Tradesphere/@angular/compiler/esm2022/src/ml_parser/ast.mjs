/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class NodeWithI18n {
    constructor(sourceSpan, i18n) {
        this.sourceSpan = sourceSpan;
        this.i18n = i18n;
    }
}
export class Text extends NodeWithI18n {
    constructor(value, sourceSpan, tokens, i18n) {
        super(sourceSpan, i18n);
        this.value = value;
        this.tokens = tokens;
    }
    visit(visitor, context) {
        return visitor.visitText(this, context);
    }
}
export class Expansion extends NodeWithI18n {
    constructor(switchValue, type, cases, sourceSpan, switchValueSourceSpan, i18n) {
        super(sourceSpan, i18n);
        this.switchValue = switchValue;
        this.type = type;
        this.cases = cases;
        this.switchValueSourceSpan = switchValueSourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitExpansion(this, context);
    }
}
export class ExpansionCase {
    constructor(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
        this.value = value;
        this.expression = expression;
        this.sourceSpan = sourceSpan;
        this.valueSourceSpan = valueSourceSpan;
        this.expSourceSpan = expSourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitExpansionCase(this, context);
    }
}
export class Attribute extends NodeWithI18n {
    constructor(name, value, sourceSpan, keySpan, valueSpan, valueTokens, i18n) {
        super(sourceSpan, i18n);
        this.name = name;
        this.value = value;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
        this.valueTokens = valueTokens;
    }
    visit(visitor, context) {
        return visitor.visitAttribute(this, context);
    }
}
export class Element extends NodeWithI18n {
    constructor(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan = null, i18n) {
        super(sourceSpan, i18n);
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitElement(this, context);
    }
}
export class Comment {
    constructor(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitComment(this, context);
    }
}
export class BlockGroup {
    constructor(blocks, sourceSpan, startSourceSpan, endSourceSpan = null) {
        this.blocks = blocks;
        this.sourceSpan = sourceSpan;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitBlockGroup(this, context);
    }
}
export class Block {
    constructor(name, parameters, children, sourceSpan, startSourceSpan, endSourceSpan = null) {
        this.name = name;
        this.parameters = parameters;
        this.children = children;
        this.sourceSpan = sourceSpan;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitBlock(this, context);
    }
}
export class BlockParameter {
    constructor(expression, sourceSpan) {
        this.expression = expression;
        this.sourceSpan = sourceSpan;
    }
    visit(visitor, context) {
        return visitor.visitBlockParameter(this, context);
    }
}
export function visitAll(visitor, nodes, context = null) {
    const result = [];
    const visit = visitor.visit ?
        (ast) => visitor.visit(ast, context) || ast.visit(visitor, context) :
        (ast) => ast.visit(visitor, context);
    nodes.forEach(ast => {
        const astResult = visit(ast);
        if (astResult) {
            result.push(astResult);
        }
    });
    return result;
}
export class RecursiveVisitor {
    constructor() { }
    visitElement(ast, context) {
        this.visitChildren(context, visit => {
            visit(ast.attrs);
            visit(ast.children);
        });
    }
    visitAttribute(ast, context) { }
    visitText(ast, context) { }
    visitComment(ast, context) { }
    visitExpansion(ast, context) {
        return this.visitChildren(context, visit => {
            visit(ast.cases);
        });
    }
    visitExpansionCase(ast, context) { }
    visitBlockGroup(ast, context) {
        this.visitChildren(context, visit => {
            visit(ast.blocks);
        });
    }
    visitBlock(block, context) {
        this.visitChildren(context, visit => {
            visit(block.parameters);
            visit(block.children);
        });
    }
    visitBlockParameter(ast, context) { }
    visitChildren(context, cb) {
        let results = [];
        let t = this;
        function visit(children) {
            if (children)
                results.push(visitAll(t, children, context));
        }
        cb(visit);
        return Array.prototype.concat.apply([], results);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL21sX3BhcnNlci9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBZUgsTUFBTSxPQUFnQixZQUFZO0lBQ2hDLFlBQW1CLFVBQTJCLEVBQVMsSUFBZTtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQVc7SUFBRyxDQUFDO0NBRTNFO0FBRUQsTUFBTSxPQUFPLElBQUssU0FBUSxZQUFZO0lBQ3BDLFlBQ1csS0FBYSxFQUFFLFVBQTJCLEVBQVMsTUFBK0IsRUFDekYsSUFBZTtRQUNqQixLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRmYsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFzQyxXQUFNLEdBQU4sTUFBTSxDQUF5QjtJQUc3RixDQUFDO0lBQ1EsS0FBSyxDQUFDLE9BQWdCLEVBQUUsT0FBWTtRQUMzQyxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxTQUFVLFNBQVEsWUFBWTtJQUN6QyxZQUNXLFdBQW1CLEVBQVMsSUFBWSxFQUFTLEtBQXNCLEVBQzlFLFVBQTJCLEVBQVMscUJBQXNDLEVBQUUsSUFBZTtRQUM3RixLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRmYsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFDMUMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFpQjtJQUU5RSxDQUFDO0lBQ1EsS0FBSyxDQUFDLE9BQWdCLEVBQUUsT0FBWTtRQUMzQyxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8s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S0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1CQUFtQixDQUFDLEdBQW1CLEVBQUUsT0FBWSxJQUFRLENBQUM7SUFFdEQsYUFBYSxDQUNqQixPQUFZLEVBQUUsRUFBd0U7UUFDeEYsSUFBSSxPQUFPLEdBQVksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNiLFNBQVMsS0FBSyxDQUFpQixRQUF1QjtZQUNwRCxJQUFJLFFBQVE7Z0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDVixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7STE4bk1ldGF9IGZyb20gJy4uL2kxOG4vaTE4bl9hc3QnO1xuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4uL3BhcnNlX3V0aWwnO1xuXG5pbXBvcnQge0ludGVycG9sYXRlZEF0dHJpYnV0ZVRva2VuLCBJbnRlcnBvbGF0ZWRUZXh0VG9rZW59IGZyb20gJy4vdG9rZW5zJztcblxuaW50ZXJmYWNlIEJhc2VOb2RlIHtcbiAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIE5vZGUgPVxuICAgIEF0dHJpYnV0ZXxDb21tZW50fEVsZW1lbnR8RXhwYW5zaW9ufEV4cGFuc2lvbkNhc2V8VGV4dHxCbG9ja0dyb3VwfEJsb2NrfEJsb2NrUGFyYW1ldGVyO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTm9kZVdpdGhJMThuIGltcGxlbWVudHMgQmFzZU5vZGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgaTE4bj86IEkxOG5NZXRhKSB7fVxuICBhYnN0cmFjdCB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9kZVdpdGhJMThuIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmFsdWU6IHN0cmluZywgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgdG9rZW5zOiBJbnRlcnBvbGF0ZWRUZXh0VG9rZW5bXSxcbiAgICAgIGkxOG4/OiBJMThuTWV0YSkge1xuICAgIHN1cGVyKHNvdXJjZVNwYW4sIGkxOG4pO1xuICB9XG4gIG92ZXJyaWRlIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRUZXh0KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFeHBhbnNpb24gZXh0ZW5kcyBOb2RlV2l0aEkxOG4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBzd2l0Y2hWYWx1ZTogc3RyaW5nLCBwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgY2FzZXM6IEV4cGFuc2lvbkNhc2VbXSxcbiAgICAgIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHN3aXRjaFZhbHVlU291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBpMThuPzogSTE4bk1ldGEpIHtcbiAgICBzdXBlcihzb3VyY2VTcGFuLCBpMThuKTtcbiAgfVxuICBvdmVycmlkZSB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RXhwYW5zaW9uKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFeHBhbnNpb25DYXNlIGltcGxlbWVudHMgQmFzZU5vZGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgZXhwcmVzc2lvbjogTm9kZVtdLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHZhbHVlU291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgZXhwU291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuXG4gIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFeHBhbnNpb25DYXNlKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGUgZXh0ZW5kcyBOb2RlV2l0aEkxOG4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICByZWFkb25seSBrZXlTcGFuOiBQYXJzZVNvdXJjZVNwYW58dW5kZWZpbmVkLCBwdWJsaWMgdmFsdWVTcGFuOiBQYXJzZVNvdXJjZVNwYW58dW5kZWZpbmVkLFxuICAgICAgcHVibGljIHZhbHVlVG9rZW5zOiBJbnRlcnBvbGF0ZWRBdHRyaWJ1dGVUb2tlbltdfHVuZGVmaW5lZCwgaTE4bjogSTE4bk1ldGF8dW5kZWZpbmVkKSB7XG4gICAgc3VwZXIoc291cmNlU3BhbiwgaTE4bik7XG4gIH1cbiAgb3ZlcnJpZGUgdmlzaXQodmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEF0dHJpYnV0ZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRWxlbWVudCBleHRlbmRzIE5vZGVXaXRoSTE4biB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGF0dHJzOiBBdHRyaWJ1dGVbXSwgcHVibGljIGNoaWxkcmVuOiBOb2RlW10sXG4gICAgICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBzdGFydFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyBlbmRTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW58bnVsbCA9IG51bGwsIGkxOG4/OiBJMThuTWV0YSkge1xuICAgIHN1cGVyKHNvdXJjZVNwYW4sIGkxOG4pO1xuICB9XG4gIG92ZXJyaWRlIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFbGVtZW50KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21tZW50IGltcGxlbWVudHMgQmFzZU5vZGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IHN0cmluZ3xudWxsLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Q29tbWVudCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmxvY2tHcm91cCBpbXBsZW1lbnRzIEJhc2VOb2RlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgYmxvY2tzOiBCbG9ja1tdLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIHN0YXJ0U291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgZW5kU291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFufG51bGwgPSBudWxsKSB7fVxuXG4gIHZpc2l0KHZpc2l0b3I6IFZpc2l0b3IsIGNvbnRleHQ6IGFueSkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0QmxvY2tHcm91cCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmxvY2sgaW1wbGVtZW50cyBCYXNlTm9kZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHBhcmFtZXRlcnM6IEJsb2NrUGFyYW1ldGVyW10sIHB1YmxpYyBjaGlsZHJlbjogTm9kZVtdLFxuICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHN0YXJ0U291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgICAgcHVibGljIGVuZFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbnxudWxsID0gbnVsbCkge31cblxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpIHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEJsb2NrKHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCbG9ja1BhcmFtZXRlciBpbXBsZW1lbnRzIEJhc2VOb2RlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGV4cHJlc3Npb246IHN0cmluZywgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cblxuICB2aXNpdCh2aXNpdG9yOiBWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0QmxvY2tQYXJhbWV0ZXIodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBWaXNpdG9yIHtcbiAgLy8gUmV0dXJuaW5nIGEgdHJ1dGh5IHZhbHVlIGZyb20gYHZpc2l0KClgIHdpbGwgcHJldmVudCBgdmlzaXRBbGwoKWAgZnJvbSB0aGUgY2FsbCB0byB0aGUgdHlwZWRcbiAgLy8gbWV0aG9kIGFuZCByZXN1bHQgcmV0dXJuZWQgd2lsbCBiZWNvbWUgdGhlIHJlc3VsdCBpbmNsdWRlZCBpbiBgdmlzaXRBbGwoKWBzIHJlc3VsdCBhcnJheS5cbiAgdmlzaXQ/KG5vZGU6IE5vZGUsIGNvbnRleHQ6IGFueSk6IGFueTtcblxuICB2aXNpdEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEF0dHJpYnV0ZShhdHRyaWJ1dGU6IEF0dHJpYnV0ZSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFRleHQodGV4dDogVGV4dCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdENvbW1lbnQoY29tbWVudDogQ29tbWVudCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEV4cGFuc2lvbihleHBhbnNpb246IEV4cGFuc2lvbiwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEV4cGFuc2lvbkNhc2UoZXhwYW5zaW9uQ2FzZTogRXhwYW5zaW9uQ2FzZSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEJsb2NrR3JvdXAoZ3JvdXA6IEJsb2NrR3JvdXAsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRCbG9jayhibG9jazogQmxvY2ssIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRCbG9ja1BhcmFtZXRlcihwYXJhbWV0ZXI6IEJsb2NrUGFyYW1ldGVyLCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdEFsbCh2aXNpdG9yOiBWaXNpdG9yLCBub2RlczogTm9kZVtdLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55W10ge1xuICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XG5cbiAgY29uc3QgdmlzaXQgPSB2aXNpdG9yLnZpc2l0ID9cbiAgICAgIChhc3Q6IE5vZGUpID0+IHZpc2l0b3IudmlzaXQhKGFzdCwgY29udGV4dCkgfHwgYXN0LnZpc2l0KHZpc2l0b3IsIGNvbnRleHQpIDpcbiAgICAgIChhc3Q6IE5vZGUpID0+IGFzdC52aXNpdCh2aXNpdG9yLCBjb250ZXh0KTtcbiAgbm9kZXMuZm9yRWFjaChhc3QgPT4ge1xuICAgIGNvbnN0IGFzdFJlc3VsdCA9IHZpc2l0KGFzdCk7XG4gICAgaWYgKGFzdFJlc3VsdCkge1xuICAgICAgcmVzdWx0LnB1c2goYXN0UmVzdWx0KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlVmlzaXRvciBpbXBsZW1lbnRzIFZpc2l0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgdmlzaXQoYXN0LmF0dHJzKTtcbiAgICAgIHZpc2l0KGFzdC5jaGlsZHJlbik7XG4gICAgfSk7XG4gIH1cblxuICB2aXNpdEF0dHJpYnV0ZShhc3Q6IEF0dHJpYnV0ZSwgY29udGV4dDogYW55KTogYW55IHt9XG4gIHZpc2l0VGV4dChhc3Q6IFRleHQsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuICB2aXNpdENvbW1lbnQoYXN0OiBDb21tZW50LCBjb250ZXh0OiBhbnkpOiBhbnkge31cblxuICB2aXNpdEV4cGFuc2lvbihhc3Q6IEV4cGFuc2lvbiwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aXNpdENoaWxkcmVuKGNvbnRleHQsIHZpc2l0ID0+IHtcbiAgICAgIHZpc2l0KGFzdC5jYXNlcyk7XG4gICAgfSk7XG4gIH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoYXN0OiBFeHBhbnNpb25DYXNlLCBjb250ZXh0OiBhbnkpOiBhbnkge31cblxuICB2aXNpdEJsb2NrR3JvdXAoYXN0OiBCbG9ja0dyb3VwLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXRDaGlsZHJlbihjb250ZXh0LCB2aXNpdCA9PiB7XG4gICAgICB2aXNpdChhc3QuYmxvY2tzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0QmxvY2soYmxvY2s6IEJsb2NrLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMudmlzaXRDaGlsZHJlbihjb250ZXh0LCB2aXNpdCA9PiB7XG4gICAgICB2aXNpdChibG9jay5wYXJhbWV0ZXJzKTtcbiAgICAgIHZpc2l0KGJsb2NrLmNoaWxkcmVuKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0QmxvY2tQYXJhbWV0ZXIoYXN0OiBCbG9ja1BhcmFtZXRlciwgY29udGV4dDogYW55KTogYW55IHt9XG5cbiAgcHJpdmF0ZSB2aXNpdENoaWxkcmVuPFQgZXh0ZW5kcyBOb2RlPihcbiAgICAgIGNvbnRleHQ6IGFueSwgY2I6ICh2aXNpdDogKDxWIGV4dGVuZHMgTm9kZT4oY2hpbGRyZW46IFZbXXx1bmRlZmluZWQpID0+IHZvaWQpKSA9PiB2b2lkKSB7XG4gICAgbGV0IHJlc3VsdHM6IGFueVtdW10gPSBbXTtcbiAgICBsZXQgdCA9IHRoaXM7XG4gICAgZnVuY3Rpb24gdmlzaXQ8VCBleHRlbmRzIE5vZGU+KGNoaWxkcmVuOiBUW118dW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY2hpbGRyZW4pIHJlc3VsdHMucHVzaCh2aXNpdEFsbCh0LCBjaGlsZHJlbiwgY29udGV4dCkpO1xuICAgIH1cbiAgICBjYih2aXNpdCk7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHJlc3VsdHMpO1xuICB9XG59XG4iXX0=