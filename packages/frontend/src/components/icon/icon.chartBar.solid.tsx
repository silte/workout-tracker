import { IconSvgBaseSolid } from './icon.svgBase.solid';

interface IconElementProps {
  className?: string;
}

export const IconChartBarSolid = ({
  className = '',
}: IconElementProps): JSX.Element => {
  return (
    <IconSvgBaseSolid className={className}>
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </IconSvgBaseSolid>
  );
};
