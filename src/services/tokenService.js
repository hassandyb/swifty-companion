import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLIENT_ID, CLIENT_SECRET } from '@env';


const TOKEN_KEY = 'swifty_access_token';
const TOKEN_EXPIRY_KEY = 'swifty_token_expiry';

async function fetchNewToken () {

    if(!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('Some credentials are missing from the .env file');
    }
    // console.log('CLIENT_ID:', CLIENT_ID);
    // console.log('CLIENT_SECRET:', CLIENT_SECRET);


    const response = await fetch('https://api.intra.42.fr/oauth/token', {
        method: 'post',
        headers: { 'Content-type': 'application/x-www-form-urlencoded', },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,

    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Token request failed: ${response.status} — ${text}`);
    }

    const data = await response.json();

    const expiryTimestamp = Date.now() + data.expires_in * 1000;

    await AsyncStorage.setItem(TOKEN_KEY, data.access_token);
    await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, String(expiryTimestamp));


    // --- LOGGING AFTER ---
    // console.log('[AFTER] New Token grabbed:', data.access_token.substring(0, 10) + '...');
    // console.log('[AFTER] New Expiry time:', new Date(expiryTimestamp).toLocaleString());


    return data.access_token;
}




export async function getValidToken() {
    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
    const storedExpiry = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);

    // --- testing the expiry date ---
    // const storedToken = "my_old_test_token";
    // const storedExpiry = String(new Date('2000-01-01').getTime()); 
    // --- LOGGING BEFORE ---
    // console.log('[BEFORE] Old Token:', storedToken);
    // console.log('[BEFORE] Old Expiry time:', new Date(parseInt(storedExpiry, 10)).toLocaleString());



    if(storedToken && storedExpiry) {
        const expiryMs = parseInt(storedExpiry, 10);

        const isExpired = Date.now() >= expiryMs - (60 * 1000);
        if(!isExpired) {
            console.log('[Token] Using cached token');
            return storedToken;
        }
        console.log('[Token] Token expired, fetching a new one');
    }
    return fetchNewToken();
}


