import { icons, type IconName } from "./icons";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const icon = icons[name];
  return (
    <svg className={`tk-icon${className ? ` ${className}` : ""}`} viewBox={icon.viewBox} aria-hidden="true">
      {icon.d.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}
