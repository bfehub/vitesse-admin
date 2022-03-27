import { ThemeEnum } from '@/enums/appEnum'

/**
 * Change the status of the project's gray mode
 * @param mode gray mode
 */
export function updateGrayMode(mode: boolean) {
  if (mode) {
    document.documentElement.classList.add('gray-mode')
  } else {
    document.documentElement.classList.remove('gray-mode')
  }
}

/**
 * Change the status of the project's weak mode
 * @param mode weak mode
 */
export function updateWeakMode(mode: boolean) {
  if (mode) {
    document.documentElement.classList.add('weak-mode')
  } else {
    document.documentElement.classList.remove('weak-mode')
  }
}

/**
 * Change the status of the project's theme mode
 * @param mode theme mode
 */
export function updateThemeMode(mode: ThemeEnum) {
  document.documentElement.classList.remove(...Object.values(ThemeEnum))
  document.documentElement.classList.add(mode)
}
