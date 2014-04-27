package com.willydupreez.personal.chaincalendar;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;

import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.spi.JsonProvider;
import javax.json.stream.JsonParser;

public class ChainCalendarFileRepository implements ChainCalendarRepository {

	private static final String EXT = ".json";

	private final File dataDir;

	public ChainCalendarFileRepository(File dataDir) {
		if (dataDir == null || !dataDir.isDirectory()) {
			throw new IllegalArgumentException("Invalid data directory" + dataDir);
		}
		this.dataDir = dataDir;
	}

	@Override
	public List<ChainCalendar> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ChainCalendar find(String name) {
		File calendarFile = new File(dataDir, name + EXT);
		JsonProvider provider = JsonProvider.provider();
		ChainCalendar calendar;
		try {
			JsonReader reader = provider.createReader(new FileInputStream(calendarFile));
			JsonObject object = reader.readObject();
			calendar = new ChainCalendar();
			calendar.setName(object.getString(name));
		} catch (FileNotFoundException e) {
			return null;
		}
		return calendar;
	}

	@Override
	public void save(ChainCalendar calendar) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(ChainCalendar calendar) {
		// TODO Auto-generated method stub

	}

}
