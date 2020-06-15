<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Edit Pelanggan</h6>
	        <div id="form-pelanggan"></div>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>

module.exports = {
	data() {
		return {}
	},
	computed:{
	},
	methods: {
	},
	mounted: async function(){
        const edit = await axios.get(rest["pelangganbyid"] + `?id=${this.$route.params.id}`);
		var datas = edit.data.data;

        var vue = this
		var act = {
			api: rest["editpelanggan"],
			vue: vue,
			action: 'edit',
			back: 'pelanggan'
		}

		$('#form-pelanggan').createForm(act,
		[
			$.inpdate('Tanggal Pendaftaran','tanggalPendaftaran','tanggalPendaftaran',true,{
                value:datas.tgl_pendaftaran
            }),
            $.inptext('Nomor Pendaftaran','nopendaftaran','nopendaftaran',true,{
                placeholder: 'Nomor Pendaftaran',
                value:datas.no_pendaftaran
            }),
            $.inptext('Nomor Seri Barcode','noseribarcode','noseribarcode',true,{
                placeholder: 'Nomor Seri Barcode',
                value:datas.no_barcode
            }),
            $.html(`<div class="form-group">
                        <label>Jenis Kelamin</label>`),
            $.inpradiobox('Laki-laki','jenisKelamin','L',{
            }),
            $.inpradiobox('Perempuan','jenisKelamin','P',{
            }),
            $.html(`</div>`),
            $.html(`<div class="form-group">
                        <label>Status Menikah</label>`),
            $.inpradiobox('Menikah','statusMenikah','y',{
            }),
            $.inpradiobox('Belum Menikah','statusMenikah','n',{
            }),
            $.html(`</div>`),
            $.inpselect(`Agama`,`agama`,`agama`,true,{
				 placeholder : `Choose Agama`,
                 option: [
                     {value : 'islam', name: 'Islam'},
                     {value : 'kristen', name: 'Kristen'},
                     {value : 'katolik', name: 'Katolik'},
                     {value : 'hindu', name: 'Hindu'},
                     {value : 'budha', name: 'Budha'},
                 ],
                 value: datas.agama
			}),
            $.inpselect(`Hobi`,`hobi`,`hobi`,false,{
				 placeholder : `Choose Hobi`,
                 option: [
                     {value : 'fashion', name: 'Fashion'},
                     {value : 'travelling', name: 'Travelling'},
                     {value : 'sport', name: 'Sport'},
                     {value : 'kuliner', name: 'Kuliner'},
                     {value : 'membaca', name: 'Membaca'},
                     {value : 'lainnya', name: 'Lainnya'},
                 ],
                 value: datas.hobi
            }),
            $.inptext('Nama Lengkap','fullname','fullname',true,{
                placeholder: 'Nama Lengkap',
                value:datas.fullname
            }),
            $.inptext('No. KTP/SIM/Passport/KIMS/KITAS','noktp','noktp',true,{
				placeholder: 'No. KTP/SIM/Passport/KIMS/KITAS',
                value:datas.no_ktp
            }),
            $.inptext('Tempat Lahir','tempatLahir','tempatLahir',true,{
                placeholder: 'Tempat Lahir',
                value:datas.tempat_lahir
            }),
            $.inpdate('Tanggal Lahir','tanggalLahir','tanggalLahir',true,{
                value:datas.tgl_lahir
            }),
            $.inptextarea('Alamat Tempat Tinggal','tempatTinggal','tempatTinggal',true,{
                placeholder: 'Alamat Tempat Tinggal',
                value:datas.alamat
            }),
            $.inptextarea('Kota','kota','kota',true,{
                placeholder: 'Kota',
                value:datas.kota
            }),
            $.inpemail('Alamat E-mail','alamatEmail','alamatEmail',false,{
                placeholder: 'Alamat E-mail',
                value:datas.email
            }),
            $.inpnumber('No. Telepon','noTelepon','noTelepon',false,{
                placeholder: 'No. Telepon',
                value:datas.phone
            }),
            $.inpnumber('No. Handphone','noHp','noHp',false,{
                placeholder: 'No. Handphone',
                value:datas.hp
            }),
            $.inptext('Facebook','facebook','facebook',false,{
                placeholder: 'Facebook',
                value:datas.facebook
            }),
            $.inptext('Twitter','twitter','twitter',false,{
                placeholder: 'Twitter',
                value:datas.twitter
            }),
            $.inptext('Instagram','instagram','instagram',false,{
                placeholder: 'Instagram',
                value:datas.instagram
            }),
            $.inpselect(`Pendidikan`,`pendidikan`,`pendidikan`,false,{
				 placeholder : `Choose Pendidikan`,
                 option: [
                     {value : 'sma', name: 'SMA'},
                     {value : 'akademi', name: 'Akademi'},
                     {value : 'universitas', name: 'Universitas'},
                     {value : 'lainnya', name: 'Lainnya'},
                 ],
                 value: datas.pendidikan
            }),
            $.inpselect(`Pekerjaan`,`pekerjaan`,`pekerjaan`,false,{
				 placeholder : `Choose Pekerjaan`,
                 option: [
                     {value : 'bumn', name: 'BUMN'},
                     {value : 'tni', name: 'TNI/Polri'},
                     {value : 'pelajar', name: 'Pelajar/Mahasiswa'},
                     {value : 'pns', name: 'PNS'},
                     {value : 'wiraswasta', name: 'Wiraswasta'},
                     {value : 'lainnya', name: 'Lainnya'},
                 ],
                 value: datas.pekerjaan
            }),
            $.inpselect(`Kunjungan Ke JCM sebulan`,`kunjunganJCM`,`kunjunganJCM`,false,{
				 placeholder : `Kunjungan Ke JCM sebulan`,
                 option: [
                     {value : '1', name: '1x'},
                     {value : '2', name: '2x'},
                     {value : '3', name: '3x'},
                     {value : '4', name: '4x'},
                     {value : '5', name: '5x'},
                 ],
                 value: datas.kunjungan
            }),
            $.inpselect(`Rata-rata Nominal Belanja di JCM`,`nominalBelanja`,`nominalBelanja`,false,{
				 placeholder : `Rata-rata Nominal Belanja di JCM`,
                 option: [
                     {value : '200', name: 'Rp.200.000 - Rp.500.000'},
                     {value : '500', name: 'Rp.500.000 - Rp.1.000.000'},
                     {value : '1000', name: 'Rp.1.000.000 - Rp.1.500.000'},
                     {value : '1500', name: 'Rp.1.500.000 - Rp.2.000.000'},
                     {value : '2000', name: 'Rp.2.000.000 - Rp.2.500.000'},
                     {value : '2500', name: '> Rp.2.500.000'},
                 ],
                 value: datas.nominal
            }),
            
        ]);

        var jenisKelamin = datas.jenis_kelamin
        var status_menikah = datas.status_menikah

        $(`#${jenisKelamin}`).prop("checked", true);
        $(`#${status_menikah}`).prop("checked", true);
	}
};
</script>