import './Icon.scss';

interface IconProps {
  icon: string;
}

function Icon({ icon }: IconProps) {
  return (
    <div className="Icon">
      <img src={icon}/>
    </div>
);
}

export default Icon;
