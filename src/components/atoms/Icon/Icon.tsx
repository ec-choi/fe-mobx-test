import { StyleProps } from '../../../types/style/props'
import S from './Icon.style'
import * as icons from './svg'

type Props = {
  name: keyof typeof icons
  size?: number
  color?: string
} & StyleProps &
  Omit<
    React.DetailedHTMLProps<React.SVGAttributes<SVGSVGElement>, SVGSVGElement>,
    'name' | 'size' | 'color'
  >

const Icon = ({ name, size = 16, color, style, className, ...props }: Props) => {
  const SVGIcon = icons[name]

  return (
    <SVGIcon
      css={S.basic}
      style={{ width: size, color, ...style }}
      data-svg-name={name}
      className={className}
      {...props}
    />
  )
}

export type IconType = (typeof iconTypes)[number]
export const iconTypes: Props['name'][] = Object.keys(icons).filter((name) => {
  return !name.startsWith('check_') && !name.startsWith('uncheck_')
}) as any[]

export default Icon
