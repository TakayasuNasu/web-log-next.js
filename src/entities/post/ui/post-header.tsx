export function Header({ date }: { date: Date }) {
  return (
    <header>
      <ul>
        <li className="name font-bold">
          <p>Tack</p>
        </li>

        <li className="email">
          <p>taka.beckham@gmail.com</p>
        </li>

        <li className="date">
          <p>
            {date.toLocaleString("en-us", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "America/Los_Angeles",
            })}
          </p>
        </li>
      </ul>
    </header>
  );
}
