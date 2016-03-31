package review.system.api.utils;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.Security;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;

import sun.misc.BASE64Encoder;

public class EncrypDES3 {

	private KeyGenerator keygen;
	private SecretKey deskey;
	private Cipher c;
	private byte[] cipherByte;

	/**
	 * @throws NoSuchAlgorithmException
	 * @throws NoSuchPaddingException
	 */
	public EncrypDES3() throws NoSuchAlgorithmException, NoSuchPaddingException {
		Security.addProvider(new com.sun.crypto.provider.SunJCE());
		keygen = KeyGenerator.getInstance("DESede");
		deskey = keygen.generateKey();
		c = Cipher.getInstance("DESede");

		BASE64Encoder base64E = new BASE64Encoder();
		@SuppressWarnings("unused")
		String skey = base64E.encode(deskey.getEncoded());
	}

	/**
	 * @param str
	 * @return
	 * @throws InvalidKeyException
	 * @throws IllegalBlockSizeException
	 * @throws BadPaddingException
	 */
	public byte[] Encrytor(String str) throws InvalidKeyException,
			IllegalBlockSizeException, BadPaddingException {
		c.init(Cipher.ENCRYPT_MODE, deskey);
		byte[] src = str.getBytes();
		cipherByte = c.doFinal(src);
		return cipherByte;
	}

	/**
	 * @param buff
	 * @return
	 * @throws InvalidKeyException
	 * @throws IllegalBlockSizeException
	 * @throws BadPaddingException
	 */
	public byte[] Decryptor(byte[] buff) throws InvalidKeyException,
			IllegalBlockSizeException, BadPaddingException {
		c.init(Cipher.DECRYPT_MODE, deskey);
		cipherByte = c.doFinal(buff);
		return cipherByte;
	}

}