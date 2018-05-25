import { Injectable } from '@angular/core';
import { Tech } from 'src/app/model/tech';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Item {
    id: number,
    name: string,
    req: Array<number>
}

@Injectable({
    providedIn: 'root'
})
export class TechService {
    
    constructor(
        private http: HttpClient
    ) { }
    
    getTechTree(id?: number, name?: string): Observable<Array<Tech>> {
        let params = new HttpParams();
        if (id) {
            params.set('id', id.toString());
        }
        if (name) {
            params.set('name', name);
        }
        return this.http.get(environment.backend, { params: params }).pipe(
            map((_raw: Array<Item>) => {
                return this.mapArrayToTree(_raw);
            })
        );
    }
    
    private mapArrayToTree(items: Array<Item>): Array<Tech> {
        let tree: Array<Tech> = [];
        
        if (items && items.length) {
            // generate all trees
            while (items.length != tree.length) {
                this.generateTree(items.find(_item => !tree.some(_node => _node.id === _item.id)), items, tree);
            }
        }
        
        return tree;
    }
    
    private generateTree(node: Item, items: Array<Item>, tree: Array<Tech>): Tech {
        if (!node) {
            return null;
        }
        
        let tech: Tech = {
            id: node.id,
            name: node.name,
            parents: [],
            children: []
        };
        tree.push(tech);
        
        for (let parentId of node.req) {
            let parent = tree.find(_node => _node.id === parentId);
            if (!parent) {
                parent = this.generateTree(items.find(_item => _item.id === parentId), items, tree);
            }
            
            if (parent) {
                parent.children.push(tech);
                tech.parents.push(parent);
            }
        }
        
        return tech;
    }
}
