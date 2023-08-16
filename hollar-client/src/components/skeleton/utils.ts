export function imageError(this: any) {
    this.onerror = null
    this.style.display = 'none'
}