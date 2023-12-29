import {surpirseMePrompts} from '../constants'

export function getRandomPrompt(prompt){
    const randomIndex =Math.floor(Math.random() * surpirseMePrompts.length)
    const randomPrompt = surpirseMePrompts[randomIndex]
    if(randomPrompt === prompt)return getRandomPrompt(prompt)
     

    return randomPrompt
}