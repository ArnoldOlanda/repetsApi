export const generateVerifyCode = () => {

    let max = 9999;
    let code = Math.floor( Math.random() * max );

    while (code < 1000) {
        code = Math.floor( Math.random() * max );
    }
    return code

}