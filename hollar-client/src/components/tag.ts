import { v4 as uuidv4 } from 'uuid'
import { dp } from '@/components/post/utils'




export function selectTemplate(item) {
  console.log('tag', item)
  const id = uuidv4()
  return `<a href="/profile/@${item.original.username}" contenteditable="false" class="relative inline bg-slate-100 text-darks dark:bg-black p-1 rounded-md dark:text-gray-200 cursor-pointer"
  onclick="this.stopPropagation; window.location.href='/profile/@${item.original.username}'"
  onmouseover="this.classList.add('profile-parent');"
  onmouseout="
  this.classList.remove('profile-parent');
  "
  >@${item.original.username} 
  <div id="${id}" class="profile-child absolute dark:bg-darks min-w-[200px] min-h-[120px] dark:shadow-barshadow p-2 z-50 border rounded-lg bg-white border-darks dark:border-black">
  <div class="flex">
  <span class="w-[45px] h-[45px] rounded-full">
  ${item.original.avatar
      ? `<img src=${item.original.avatar} class="w-[45px] h-[45px] rounded-full object-cover" onerror="this.onerror=null;this.style.display=none;"/>`
      : `<span class="w-[45px] h-[45px] rounded-full bg-gray-400 text-white flex items-center font-semibold justify-center">${dp(item.original.fullName)}</span>`
    }</span>
    <div class="w-[80%] flex flex-col items-center">
      <div class="text-base font-Raleway dark:text-white">
        @${item.original.username}
      </div>
      <button
        class="block w-[80%] mt-2 font-semibold bg-base rounded-md py-1 text-white text-center font-QuickSand"
        onclick="alert('follow')"
      >
        follow
      </button>
    </div>
  </div>
  <div class="text-gray-700 mt-4">
    <i class="fa-solid fa-star text-yellow-500"></i>
    <span class="ml-1 dark:text-white">
     ${item.original.favourite ?? 'unknown'}
    </span>
  </div>
</div>
  </a>
  `
}
export function menuItemTemplate(item) {
  return `<div class="flex items-center gap-3">
      <span class="w-[45px] h-[45px] rounded-full">
      ${item.original.avatar
      ? `<img src=${item.original.avatar} class="w-[45px] h-[45px] rounded-full object-cover" onerror="this.onerror=null;this.style.display=none;"/>`
      : `<span class="w-[45px] h-[45px] rounded-full bg-gray-400 text-white flex items-center font-semibold justify-center">${dp(item.original.fullName)}</span>`
    }</span><div class=""><span class="five text-md">${item.original.fullName
    }</span><span  class="font-Raleway text-sm ml-2">@${item.original.username}</span></div></div>`
}

