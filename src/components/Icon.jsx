import * as Icons from './icons';

export default function Icon({ name, ...props }) {
  const Component = Icons[name.charAt(0).toUpperCase() + name.slice(1)];
  if (!Component) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }
  return <Component {...props} />;
}
