Vagrant.configure("2") do |config|

    # config.vm.box = "file:///linux/path/to/box/file/vagrant-windows-edge.box"

    config.vm.provider "virtualbox" do |vb|
        vb.memory = "2524"
        vb.gui = true
        vb.name = "vagrant-windows-selenium"
        vb.customize ["modifyvm", :id, "--vram", "128"]
    end
end