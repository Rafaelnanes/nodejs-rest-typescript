class Consts {
    public TOKEN_SECRET: string = 'supersecret';
    public TOKEN_EXPIRATION: string = '1h';
    public TOKEN_HEADER: string = 'authorization';
    public HASH_TYPE: string = 'supersecret';
    public STATUS_SUCCESS: number = 0;
    public STATUS_ERROR: number = 1;
    public STATUS_UNAUTHORIZED: number = 2;
    public STATUS_INTERNAL_ERROR: number = 3;
}

export default new Consts();