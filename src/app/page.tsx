import Link from "next/link";
import {Button} from "antd";

export default function Home() {
    return (
        <>
            <main>
                <Link href={"/users"}>
                    <Button type="primary">Utilisateurs</Button>
                </Link>
            </main>
            <footer>

            </footer>
        </>
    );
}
