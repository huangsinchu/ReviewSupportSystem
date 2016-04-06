package review.system.api.utils;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.Security;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.log4j.Logger;

public class EncrypDES3 {

	private static Logger logger = Logger.getLogger(EncrypDES3.class);
	// private KeyGenerator keygen;
	private SecretKey deskey;
	private Cipher c;
	private byte[] cipherByte;

	public EncrypDES3() {
		Security.addProvider(new com.sun.crypto.provider.SunJCE());
		try {
			// keygen = KeyGenerator.getInstance("DESede");
			// deskey = keygen.generateKey();
			// BASE64Encoder base64E = new BASE64Encoder();
			// String skey = base64E.encode(deskey.getEncoded());
			KeySpec keyspec = new DESedeKeySpec(
					"HIkvFZtPSjtbmEXE6kr38hzlaP00tUq5".getBytes());
			SecretKeyFactory factory = SecretKeyFactory.getInstance("DESede");
			deskey = factory.generateSecret(keyspec);
			c = Cipher.getInstance("DESede");
		} catch (NoSuchAlgorithmException | NoSuchPaddingException
				| InvalidKeyException | InvalidKeySpecException e) {
			logger.error("EncrypDES3 Init Error: " + e);
		}

	}

	public byte[] Encrytor(String str) {
		try {
			c.init(Cipher.ENCRYPT_MODE, deskey);
			byte[] src = str.getBytes();
			cipherByte = c.doFinal(src);
		} catch (InvalidKeyException | IllegalBlockSizeException
				| BadPaddingException e) {
			logger.error("EncrypDES3 Encrytor Error: " + e);
		}
		return cipherByte;
	}

	public byte[] Decryptor(byte[] buff) {
		try {
			c.init(Cipher.DECRYPT_MODE, deskey);
			cipherByte = c.doFinal(buff);
		} catch (InvalidKeyException | IllegalBlockSizeException
				| BadPaddingException e) {
			logger.error("EncrypDES3 Decryptor Error: " + e);
		}
		return cipherByte;
	}

	public static void main(String[] args) {
		try {
			byte[] r = new EncrypDES3().Encrytor("Sakura");
			String string = new String(new EncrypDES3().Decryptor(r), "GB2312");
			System.out.println(string);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
}