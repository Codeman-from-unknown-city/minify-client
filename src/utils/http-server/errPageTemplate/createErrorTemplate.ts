import minify from "../../minifyCode";
import head from "./head";
import styles from "./style";

export default (errMessage: string) => minify(`
<!DOCTYPE html>
<html lang="en">
${head}
<body>
    <style>${styles}</style>
    <div class="err">
        <a class="return" href="/"><h2>← Return to the homepage</h2></a>
        <h1>HTTP/1.1 ${errMessage}\r\n\r\n</h1>
    </div>
</body>
</html>
`, 'html');
