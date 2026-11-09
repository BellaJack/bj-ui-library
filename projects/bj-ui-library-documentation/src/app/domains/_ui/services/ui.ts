import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menuItem';

@Injectable({
    providedIn: 'root'
})

export class UiService {
    sideMenuItemActiveId = signal<string | null>(null);

    /*
     * Side Menu
    */

    generateHeaderId(text: string, index: number): string {
        // Create a URL-friendly ID from the heading text
        const baseId = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        return baseId || `section-${index}`;
    }

    buildHierarchy(items: MenuItem[]): MenuItem[] {
        const result: MenuItem[] = [];
        let currentH2: MenuItem | null = null;

        items.forEach(item => {
            if (item.level === 2) {
                item.children = [];
                result.push(item);
                currentH2 = item;
            } else if (item.level === 3 && currentH2) {
                currentH2.children!.push(item);
            }
        });

        return result;
    }

    extractHeadings(): MenuItem[] {
        // Find all h2 and h3 elements in the page content
        const pageContent = document.querySelector('.bj-doc-page-content');
        if (!pageContent) return [];

        const headings = pageContent.querySelectorAll('h2, h3');
        const flatItems: MenuItem[] = [];

        headings.forEach((heading, index) => {
            // Generate or use existing ID
            let id = heading.id;
            if (!id) {
                id = this.generateHeaderId(heading.textContent || '', index);
                heading.id = id;
            }

            const level = heading.tagName.toLowerCase() === 'h2' ? 2 : 3;

            flatItems.push({
                id,
                text: heading.textContent?.trim() || '',
                element: heading as HTMLElement,
                level
            });
        });

        return this.buildHierarchy(flatItems);
    }

    updateActiveItem(menuItems: MenuItem[]): void {
        const scrollPosition = window.scrollY + 100; // Offset for better UX
        const allItems = this.getAllItems(menuItems);

        for (let i = allItems.length - 1; i >= 0; i--) {
            const item = allItems[i];
            if (item.element.offsetTop <= scrollPosition) {
                this.sideMenuItemActiveId.set(item.id);
                return;
            }
        }

        this.sideMenuItemActiveId.set(allItems[0]?.id || null);
    }

    getAllItems(menuItems: MenuItem[]): MenuItem[] {
        const items: MenuItem[] = [];
        menuItems.forEach(item => {
            items.push(item);
            if (item.children) {
                items.push(...item.children);
            }
        });
        return items;
    }

    scrollToSection(id: string, event: Event): void {
        event.preventDefault();
        const element = document.getElementById(id);

        if (element) {
            const offset = 6 * 16; // Offset for fixed headers if any (6rem)
            const elementPosition = element.offsetTop - offset;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });

            this.sideMenuItemActiveId.set(id);
        }
    }
}
