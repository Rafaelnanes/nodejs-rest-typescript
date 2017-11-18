let env = 'development';
if(!!process.env.NODE_ENV){
    env = process.env.NODE_ENV;
}

export default () => require(`./env/${env}.env`);